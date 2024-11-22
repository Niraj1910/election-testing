const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Party = require('../models/party.model'); // Adjust the path as necessary
const Constituency = require('../models/constituency'); // Adjust the path as necessary
const multer = require('multer');
const mime = require('mime-types')
const {getFullImagePath, cachedKeys} = require('../utils');
const RedisManager = require('../RedisManager');
const Candidate = require('../models/candidates');

const redis = RedisManager.getInstance();  // Get the Redis instance


// Define the validation schema for the party
const partySchema = Joi.object({
  party: Joi.string().required(),
  color_code: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).required(), // Hex color code
  party_logo: Joi.string().optional(), // URL of the party logo,
  total_votes: Joi.number(),
  electors: Joi.number(),
  total_seat: Joi.number(), // Total seats in the assembly
  votes_percentage: Joi.number().optional().min(0).max(100) // Optional percentage of votes, between 0 and 100
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/party_logos'); // Destination folder
  },
  filename: (req, file, cb) => {
    const filename = req.body.party;
    const ext = mime.extension(file.mimetype);
    cb(null, Date.now() + '-' + filename + '.' + ext); // Unique file name
  },
});

const upload = multer({ storage });

router.get('/top-parties', async (req, res) => {
  try {
    // Pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch top parties from the database with pagination
    const topParties = await Party.find()
      .sort({ total_votes: -1 })
      .skip(skip)
      .limit(limit);

    res.json(topParties);
  } catch (error) {
    console.log('top-parties error', error);
    res.status(500).json({ error: 'Failed to retrieve Top parties' });
  }
});

router.get('/parties-summary', async (req, res) => {
  try {

    // Cache miss, proceed to fetch data from the database
    const parties = await Party.find({ 
      party: { $in: ['BJP+', 'JMM+', 'बीजेपी+', 'जेएमएम+'] }
    }).sort({ createdAt: -1 });

    // Map the filtered parties into the desired structure
    let partiesList = parties.map(part => ({
      party: part.party,
      color_code: part.color_code,
      total_votes: part.total_votes,
      total_seat: part.total_seat,
      party_logo: part.party_logo ? getFullImagePath(req, "party_logos/" + part.party_logo) : null
    }));

    // Fetch total number of constituencies
    const totalSeats = await Constituency.countDocuments();

    // Prepare the response data
    const responseData = { totalSeats, partiesList };

    res.json(responseData);

  } catch (error) {
    console.log('Error fetching parties summary:', error);
    res.status(500).json({ error: 'Failed to fetch parties summary' });
  }
});

router.get('/party-count', async (req, res) => {
  try {
    const result = await Candidate.aggregate([
      {
        $unwind: '$constituency', // Unwind constituency array
      },
      {
        $group: {
          _id: '$constituency', // Group by constituency
          maxVotes: { $max: '$totalVotes' }, // Find the maximum votes in each constituency
        },
      },
      {
        $lookup: {
          from: 'candidates', // Lookup to find the candidate with the maximum votes
          localField: '_id',
          foreignField: 'constituency',
          as: 'candidates',
        },
      },
      {
        $unwind: '$candidates', // Unwind the candidates array
      },
      {
        $match: {
          $expr: { $eq: ['$candidates.totalVotes', '$maxVotes'] }, // Match only the candidate with the maximum votes
        },
      },
      {
        $match: {
          'candidates.totalVotes': { $gt: 0 }, // Only consider candidates with votes greater than 0
        },
      },
      {
        $lookup: {
          from: 'parties', // Lookup to fetch the party of the candidate
          localField: 'candidates.party',
          foreignField: '_id',
          as: 'partyDetails',
        },
      },
      {
        $unwind: '$partyDetails', // Unwind party details
      },
      {
        $group: {
          _id: '$partyDetails.party', // Group by party name
          constituencyCount: { $sum: 1 }, // Count the number of constituencies each party leads
        },
      },
      {
        $sort: { constituencyCount: -1 }, // Sort parties by the count in descending order
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// POST route to create a new party
router.post('/', upload.single('party_logo'), async (req, res) => {
  try {
    const partyData = {
      party: req.body.party,
      color_code: req.body.color_code,
      total_seat: req.body.total_seat,
      total_votes: req.body.total_votes,
      electors: req.body.electors,
      votes_percentage: req.body.votes_percentage
    };

    if (req.file) {
      partyData['party_logo'] = getFullImagePath(req, "party_logos"); // Use file path if available
    }

    // Validate the request body against the schema
    const { error } = partySchema.validate(partyData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the party already exists
    const existingParty = await Party.findOne({ party: partyData.party });
    if (existingParty) {
      return res.status(400).json({ error: 'Party already exists' });
    }

    // Create a new party and save it
    const newParty = new Party(partyData);
    await newParty.save();

    await redis.clearAllKeys();

    // Redirect to the list of parties (or return response if desired)
    res.redirect('/parties');

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create new party' });
  }
});


// GET route to retrieve all parties
router.get('/', async (req, res) => {
  try {
    const cachedData = await redis.get(cachedKeys.PARTY);
    if(cachedData){
      return res.json(cachedData);
    }
    const parties = await Party.find();
    await redis.set(cachedKeys.PARTY, parties); // Cache the result
    res.json(parties);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve party data' });
  }
});

// GET route to retrieve a single party by ID
router.get('/:id', async (req, res) => {
  try {
    const cachedData = await redis.get(cachedKeys.PARTY + ':' +req.params.id);
    if(cachedData){
      return res.json(cachedData);
    }
    const party = await Party.findById(req.params.id);

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    await redis.set(cachedKeys.PARTY + ':' + req.params.id, party); // Cache the result

    res.json(party);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve party data' });
  }
});

// PUT route to update a party by ID
router.put('/:id', upload.single('party_logo'), async (req, res) => {
  try {
    const partyData = {
      party: req.body.party,
      color_code: req.body.color_code,
      total_seat: req.body.total_seat,
      total_votes: req.body.total_votes,
      electors: req.body.electors,
      votes_percentage: req.body.votes_percentage
    };

    if(req.file){
      partyData['party_logo'] = getFullImagePath(req, "party_logos") // Use file path if available
    }


    const { error } = partySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message }); // Return validation error
    }

    const party = await Party.findByIdAndUpdate(req.params.id, partyData, { new: true });

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    await redis.clearAllKeys(); // Clear Redis cache when a party is updated or deleted

    res.json(party);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update party data' });
  }
});

// DELETE route to delete a party by ID
router.delete('/:id', async (req, res) => {
  try {
    const party = await Party.findByIdAndDelete(req.params.id);

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    await redis.clearAllKeys();
    return res.status(200).json({ message: 'Deleted party'});
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete party data' });
  }
});

module.exports = router;
