const express = require('express');
const { z } = require('zod'); // Import Zod for validation
const Election = require('../models/election.model');
const isAdmin = require('../middleware/admin');

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
    res.status(201).json(savedElection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/states', async (req, res) => {
  try {
    const states = await Election.find({});
    const statesWithSlugs = states.map(state => ({
      name: state.state,
      slug: state.stateSlug,
      id: state._id
    }));
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


router.get('/', isAdmin, async (req, res) => {
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

    res.status(200).json(updatedElection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/parties-summary')


module.exports = router;