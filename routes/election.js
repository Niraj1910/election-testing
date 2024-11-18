const express = require('express');
const { z } = require('zod'); // Import Zod for validation
const Election = require('../models/election.model');
const isAdmin = require('../middleware/admin');
const RedisManager = require('../RedisManager');
const { cachedKeys } = require('../utils');

const redis = RedisManager.getInstance();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { state, totalSeats, declaredSeats, halfWayMark, parties } = req.body;
    const stateSlug = state.toLowerCase().replace(/ /g, '_');

    // Check if an election for the given state already exists
    const existingElection = await Election.findOne({ stateSlug });
    if (existingElection) {
      return res.status(409).json({ error: 'Election for this state already exists' });
    }

    const election = new Election({
      state,
      stateSlug,
      totalSeats,
      declaredSeats,
      halfWayMark,
      parties
    });

    const savedElection = await election.save();
    await redis.clearAllKeys(); // Clear all Redis keys when a new election is created
    res.status(201).json(savedElection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/states', async (req, res) => {
  try {
    const cachedData = await redis.get(cachedKeys.STATE_ELECTION);
    if(cachedData){
      return res.json(cachedData);
    }
    const states = await Election.find({});
    const statesWithSlugs = states.map(state => ({
      name: state.state,
      slug: state.stateSlug,
      id: state._id
    }));

    await redis.setWithTTL(cachedKeys.STATE_ELECTION, statesWithSlugs, 3600);
    return res.status(200).json({ message: 'States, their slugs, and ids retrieved successfully', data: statesWithSlugs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get API to retrieve election data by state
router.get('/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({ message: 'Election data not found' });
    }

    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;

    const elections = await Election.find();
    const paginatedData = elections.slice(startIndex, endIndex);

    if (!paginatedData) {
      return res.status(404).json({ message: 'No elections found' });
    }

    const result = {
      currentPage: pageInt,
      totalPages: Math.ceil(elections.length / limitInt),
      totalItems: elections.length,
      data: paginatedData
    };

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const election = await Election.findByIdAndDelete(id);

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    await redis.clearAllKeys(); // Clear Redis cache when an election is deleted

    res.status(200).json({ message: 'Election successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedElection = await Election.findByIdAndUpdate(id, req.body);

    if (!updatedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }
    await redis.clearAllKeys(); // Clear Redis cache when an election is updated

    res.status(200).json(updatedElection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;