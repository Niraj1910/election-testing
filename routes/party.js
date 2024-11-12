const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Party = require('../models/party.model'); // Adjust the path as necessary
const Constituency = require('../models/constituency'); // Adjust the path as necessary
const multer = require('multer');
const mime = require('mime-types')
const {getFullImagePath} = require('../utils');
const RedisManager = require('../RedisManager');

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

    // Try to get the top parties from cache
    const cacheKey = `top-parties-page-${page}-limit-${limit}`;
    const cachedData = await redis.get(cacheKey);
    console.log(cachedData);

    if (cachedData) {
      return res.json(cachedData); // Send the cached response
    }

    // Fetch top parties from the database with pagination
    const topParties = await Party.find()
      .sort({ total_votes: -1 })
      .skip(skip)
      .limit(limit);

    // Cache the result for future requests
    await redis.setWithTTL(cacheKey, topParties, 60 * 60); // Cache for 1 hour

    res.json(topParties);
  } catch (error) {
    console.log('top-parties error', error);
    res.status(500).json({ error: 'Failed to retrieve Top parties' });
  }
});

router.get('/parties-summary', async (req, res) => {
  try {

    // Check if the data is already cached in Redis
    const cachedData = await redis.get('parties-summary');
    
    if (cachedData) {
      // If data exists in Redis, return it immediately
      console.log('Cache hit');
      return res.json(cachedData);
    }

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

    // Cache the data in Redis with a TTL of 1 hour (3600 seconds)
    await redis.setWithTTL('parties-summary', responseData, 3600); 
    res.json(responseData);

  } catch (error) {
    console.log('Error fetching parties summary:', error);
    res.status(500).json({ error: 'Failed to fetch parties summary' });
  }
});

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

    // Clear the parties summary cache to ensure it reflects the latest data
    await redis.delete('parties-summary'); // Clear the cache for the summary page
    await redis.delete('all-parties'); // Clear the cache for the summary page
    

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
    // Check if the parties data is cached in Redis
    const cachedParties = await redis.get('all-parties');
    if (cachedParties) {
      // If cached data is available, return it
      return res.json(cachedParties);
    }

    const parties = await Party.find();

    await redis.setWithTTL('all-parties', parties, 3600); // Cache for 1 hour

    res.json(parties);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve party data' });
  }
});

// GET route to retrieve a single party by ID
router.get('/:id', async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

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

    await redis.delete('parties-summary'); // Clear the cache for the summary page
    await redis.delete('all-parties'); 

    return res.status(200).json({ message: 'Deleted party'});
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete party data' });
  }
});

module.exports = router;
