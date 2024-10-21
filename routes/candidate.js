
const express = require('express');
const Candidate = require('../models/candidates');
const multer = require('multer');
const router  = express.Router();
const mime = require('mime-types');
const { getFullImagePath } = require('../utils');
const Constituency = require('../models/constituency');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/candidates');
    },
    filename: (req, file, cb) => {
        const ext = mime.extension(file.mimetype);
        cb(null, Date.now() + '.' + ext);
    },
  });
  
const upload = multer({ storage });
router.get('/', async (req, res, next) => {
  try {
    const candidates = await Candidate.find({}).populate('party');
    res.json(candidates);
  } catch (error) {
    next(error);
  }
});

// Get single candidate by ID with error handling enabled
router.get('/:id', async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).send('Candidate not found');
    res.json(candidate);
  } catch (error) {
    next(error);
  }
});

// Add a new candidate with error handling enabled
router.post('/', upload.single('image'), async (req, res, next) => {
    try {
      const candidateData = {
        name: req.body.name,
        party: req.body.party,
        totalVotes: req.body.totalVotes,
        age: req.body.age,
        gender: req.body.gender,
        image: req.file ? getFullImagePath(req, 'candidates') : null,
        constituency: req.body.constituency,
      };

      let existingConstituency;

      if(candidateData.constituency){
        existingConstituency = await Constituency.findById(candidateData.constituency);
        if (!existingConstituency) {
          return res.status(404).send('Constituency is Invalid');
        }
      }
      const candidate = new Candidate({
        name: candidateData.name,
        party: candidateData.party,
        totalVotes: candidateData.totalVotes,
        age: candidateData.age,
        gender: candidateData.gender,
        image: candidateData.image,
        constituency: candidateData.constituency || null,
      });
      const newCandidate = await candidate.save();
      if(existingConstituency){
        existingConstituency.candidates.push(newCandidate._id);
        await existingConstituency.save();
      }
      res.redirect(`/candidates`);
    } catch (error) {
      next(error);
    }
  });

// Update a candidate by ID with error handling enabled
router.put('/:id', upload.single('image'), async (req, res, next) => {
    try {
      // Find the existing candidate
      const existingCandidate = await Candidate.findById(req.params.id);
      if (!existingCandidate) return res.status(404).send('Candidate not found');
  
      // Prepare the candidate updates
      const candidateUpdates = {
        name: req.body.name,
        party: req.body.party,
        age: req.body.age,
        gender: req.body.gender,
        totalVotes: req.body.totalVotes,
        constituency: req.body.constituency || existingCandidate.constituency, // Update constituency if provided in the request body, else keep it as it is.
        image: req.file ? getFullImagePath(req, 'candidates') : req.body.image || existingCandidate.image,
      };
  
      // Update the candidate
      const candidate = await Candidate.findByIdAndUpdate(req.params.id, candidateUpdates, { new: true });

      if(req.body.constituency){
        const existingConstituency = await Constituency.findById(candidateUpdates.constituency);
        if (!existingConstituency) {
          return res.status(404).send('Constituency is Invalid');
        }
        existingConstituency.candidates.includes(
          candidate._id
        )
         ? existingConstituency.candidates.splice(existingConstituency.candidates.indexOf(candidate._id), 1)
         : existingConstituency.candidates.push(candidate._id);
         await existingConstituency.save();
      }
      res.json(candidate);
    } catch (error) {
      next(error);
    }
  });
  

// Delete a candidate by ID with error handling enabled
router.delete('/:id', async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).send('Candidate not found');
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
