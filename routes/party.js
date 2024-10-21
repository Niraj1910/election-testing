const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Party = require('../models/party.model'); // Adjust the path as necessary
const multer = require('multer');
const mime = require('mime-types')
const {getFullImagePath} = require('../utils');

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

      if(req.file){
        partyData['party_logo'] = getFullImagePath(req, "party_logos") // Use file path if available
      }

      // Validate the request body against the schema
      const { error } = partySchema.validate(partyData);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const existingParty = await Party.findOne({ party: partyData.party });
      if (existingParty) {
        return res.status(400).json({ error: 'Party already exists' });
      }
  
      const newParty = new Party(partyData);
      await newParty.save();
      res.redirect('/parties');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create new party' });
    }
  });

// GET route to retrieve all parties
router.get('/', async (req, res) => {
  try {
    const parties = await Party.find();
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

    console.log(partyData)

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

    return res.status(200).json({ message: 'Deleted party'});
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete party data' });
  }
});

module.exports = router;
