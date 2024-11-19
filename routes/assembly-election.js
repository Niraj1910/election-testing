const express = require('express');
const Joi = require('joi');
const AssemblyElection = require('../models/assembly-election.model');
const Candidate = require('../models/candidates');
const RedisManager = require('../RedisManager');
const { cachedKeys } = require('../utils');
const isAdmin = require('../middleware/admin');
const router = express.Router();

const redis = RedisManager.getInstance();

const electionSchema = Joi.object({
  year: Joi.string().required(),
  state: Joi.string().required(),
  total_seat: Joi.number().required(),
  total_votes: Joi.string().required(),
  total_candidate: Joi.number().required(),
  constituencies: Joi.array().optional().items(Joi.string().required()), // Assuming constituencies are ObjectId strings
});

// Create a new AssemblyElection
router.post('/',isAdmin, async (req, res) => {
  try {
    const { error } = electionSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const election = new AssemblyElection(req.body);
    await election.save();

    await redis.clearAllKeys();
    
    return res.status(201).redirect('/assembly-election');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get all AssemblyElections
router.get('/', async (req, res) => {
  try {
    // Fetch from cache if available
    const cachedData = await redis.get(cachedKeys.ASSEMBLY_ELECTION);
    if(cachedData){
      return res.json(cachedData);
    }

    // Clear cache after 5 minutes
    // Fetch from DB if no cache
    const elections = await AssemblyElection.find().populate('constituencies');
    await redis.setWithTTL(cachedKeys.ASSEMBLY_ELECTION, elections, 3600); // Cache for 5 minutes

    res.json(elections);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get an AssemblyElection by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cachedData = await redis.get(cachedKeys.ASSEMBLY_ELECTION + ':' + req.params.id);
    if(cachedData){
      return res.json(cachedData);
    }

    const election = await AssemblyElection.findById(req.params.id).populate('constituencies');
    if (!election) return res.status(404).send('Election not found');
    await redis.setWithTTL(cachedKeys.ASSEMBLY_ELECTION + ':' + req.params.id, election, 3600); // Cache the result
    res.json(election);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update an AssemblyElection by ID
router.put('/:id', isAdmin,async (req, res) => {
  try {
    const { error } = electionSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const election = await AssemblyElection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!election) return res.status(404).send('Election not found');

    await redis.clearAllKeys();
    res.json(election);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete an AssemblyElection by ID
router.delete('/:id',isAdmin, async (req, res) => {
  try {
    const election = await AssemblyElection.findByIdAndDelete(req.params.id);
    if (!election) return res.status(404).send('Election not found');

    await redis.clearAllKeys();
        
    res.json({ message: 'Election deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// route with /state/:id 
router.get('/state/:name', async (req, res) => {
  try {

    const cachedData = await redis.get(cachedKeys.ASSEMBLY_ELECTION + `:${req.params.name}`);

    if(cachedData){
      return res.json(cachedData);
    }

    // Fetch the elections with full population of nested documents
    const elections = await AssemblyElection.findOne({ state: req.params.name })
      .populate({
        path: 'constituencies',
        populate: {
          path: 'candidates',
          model: 'Candidate',
          populate: {
            path: 'party',
            model: 'Party',
          },
        },
      });

    if (!elections) return res.status(404).send('No elections found in this state');

    // Process each constituency to determine leading and trailing candidates
    const constituencies = await Promise.all(
      elections.constituencies.map(async (constituency) => {
        // Fetch sorted candidates for the constituency
        const cands = await Candidate.find({ constituency: constituency._id })
          .sort({ totalVotes: -1 })  // Sort by total votes in descending order
          .populate('party');

        const highestVoteCandidate = cands[0]; // Leading candidate (highest votes)
        const lowestVoteCandidate = cands[1]; // Trailing candidate (lowest votes)

        const leadingPartyColor = highestVoteCandidate ? highestVoteCandidate.party.color_code : null;
        const trailingPartyColor = lowestVoteCandidate ? lowestVoteCandidate.party.color_code : null;

        // Construct the constituency object with leading and trailing candidates
        return {
          _id: constituency._id,
          name: constituency.name,
          state: constituency.state,
          totalVotes: constituency.totalVotes,
          color: highestVoteCandidate && highestVoteCandidate.totalVotes > 0 ? leadingPartyColor : "#C0C0C0",
          leadingCandidate: highestVoteCandidate
            ? {
                _id: highestVoteCandidate._id,
                name: highestVoteCandidate.name,
                totalVotes: highestVoteCandidate.totalVotes,
                party: {
                  _id: highestVoteCandidate.party._id,
                  party: highestVoteCandidate.party.party,
                  color_code: leadingPartyColor,
                  party_logo: highestVoteCandidate.party.party_logo,
                },
              }
            : null,
          trailingCandidate: lowestVoteCandidate
            ? {
                _id: lowestVoteCandidate._id,
                name: lowestVoteCandidate.name,
                totalVotes: lowestVoteCandidate.totalVotes,
                party: {
                  _id: lowestVoteCandidate.party._id,
                  party: lowestVoteCandidate.party.party,
                  color_code: trailingPartyColor,
                  party_logo: lowestVoteCandidate.party.party_logo,
                },
              }
            : null,
        };
      })
    );

    // Send the response with structured data

    await redis.setWithTTL(cachedKeys.ASSEMBLY_ELECTION + `:${req.params.name}`, {
      state: elections.state,
      year: elections.year,
      total_seat: elections.total_seat,
      total_votes: elections.total_votes,
      total_candidate: elections.total_candidate,
      constituency: constituencies,
    }, 3600);

    res.json({
      state: elections.state,
      year: elections.year,
      total_seat: elections.total_seat,
      total_votes: elections.total_votes,
      total_candidate: elections.total_candidate,
      constituency: constituencies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
