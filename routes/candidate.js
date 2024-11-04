
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

router.get('/cn-list', async (req, res, next) => {
  try {
    // Extract the search query parameter
    const { constituency } = req.query;

    if (constituency) {
      // If a constituency is provided, fetch the candidates from that constituency
      const constituencies = await Constituency.find({
        name: { "$regex": constituency, "$options": "i" }, // Case-insensitive search
      }).populate({
        path: 'candidates',
        model: 'Candidate',
        populate: [
          {
            path: 'party', // Populate party for each candidate
            model: 'Party',
          },
          {
            path: 'constituency', // Populate constituency for each candidate
            model: 'Constituency',
          },
        ],
      });

      // Check if any constituencies were found
      if (constituencies.length === 0) {
        return res.json([]);
      }

      // Sort candidates by totalVotes in descending order
      const sortedCandidates = constituencies[0].candidates.sort((a, b) => b.totalVotes - a.totalVotes);
      return res.json(sortedCandidates);
    }

    // If no constituency is provided, fetch the first 3 candidates for each constituency
    const allConstituencies = await Constituency.find().populate({
      path: 'candidates',
      model: 'Candidate',
      populate: [
        {
          path: 'party', // Populate party for each candidate
          model: 'Party',
        },
        {
          path: 'constituency', // Populate constituency for each candidate
          model: 'Constituency',
        },
      ],
    });

    // Use a Set to track unique candidate IDs and avoid duplicates
    const uniqueCandidates = new Set();
    const candidatesList = [];

    allConstituencies.forEach((constituency) => {
      // Sort the candidates by totalVotes in descending order and get the first 3
      const topCandidates = constituency.candidates
        .sort((a, b) => b.totalVotes - a.totalVotes)
        .slice(0, 3); // Get the first 3 candidates

      topCandidates.forEach((candidate) => {
        if (!uniqueCandidates.has(candidate._id.toString())) {
          uniqueCandidates.add(candidate._id.toString());
          candidatesList.push(candidate);
        }
      });
    });

    res.json(candidatesList);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const existingCandidate = await Candidate.findById(req.params.id);
    if (!existingCandidate) return res.status(404).send('Candidate not found');
    
    // Prepare candidate updates
    const candidateUpdates = {
      name: req.body.name,
      party: req.body.party,
      age: req.body.age,
      gender: req.body.gender,
      totalVotes: req.body.totalVotes,
      constituency: req.body.constituency || existingCandidate.constituency, // Assuming this comes as an array of constituency IDs
      image: req.file ? getFullImagePath(req, 'candidates') : req.body.image || existingCandidate.image,
    };

    // Update the candidate
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, candidateUpdates, { new: true });

    // Update constituencies
    const currentConstituencyIds = existingCandidate.constituency.map(c => c.toString());
    const newConstituencyIds = Array.isArray(req.body.constituency) ? req.body.constituency : [req.body.constituency];

    // Remove candidate from constituencies no longer assigned
    const constituenciesToRemove = currentConstituencyIds.filter(id => !newConstituencyIds.includes(id));
    for (const id of constituenciesToRemove) {
      const constituency = await Constituency.findById(id);
      if (constituency) {
        constituency.candidates = constituency.candidates.filter(candidateId => !candidateId.equals(candidate._id));
        await constituency.save();
      }
    }

    // Add candidate to new constituencies
    for (const id of newConstituencyIds) {
      const constituency = await Constituency.findById(id);
      if (constituency) {
        if (!constituency.candidates.includes(candidate._id)) {
          constituency.candidates.push(candidate._id);
          await constituency.save();
        }
      }
    }

    res.json(candidate);
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
    let constituencyIds = Array.isArray(req.body.constituency) 
      ? req.body.constituency 
      : req.body.constituency ? [req.body.constituency] : [];

    const candidateData = {
      name: req.body.name,
      party: req.body.party,
      totalVotes: req.body.totalVotes,
      age: req.body.age,
      gender: req.body.gender,
      image: req.file ? getFullImagePath(req, 'candidates') : null,
      constituency: constituencyIds, // Now it's already an array
    };

    const validConstituencies = [];

    // Validate each constituency ID
    for (const id of candidateData.constituency) {
      const existingConstituency = await Constituency.findById(id);
      if (!existingConstituency) {
        return res.status(404).send(`Constituency with ID ${id} is invalid`);
      }
      validConstituencies.push(existingConstituency._id); // Store valid constituency IDs
    }

    const candidate = new Candidate({
      name: candidateData.name,
      party: candidateData.party,
      totalVotes: candidateData.totalVotes,
      age: candidateData.age,
      gender: candidateData.gender,
      image: candidateData.image,
      constituency: validConstituencies, // Store valid constituencies
    });

    const newCandidate = await candidate.save();

    // Update each constituency with the new candidate's ID
    for (const id of validConstituencies) {
      const constituency = await Constituency.findById(id);
      constituency.candidates.push(newCandidate._id); // Add new candidate ID to the constituency's candidates array
      await constituency.save();
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
      constituency: req.body.constituency,
      image: req.file ? getFullImagePath(req, 'candidates') : req.body.image || existingCandidate.image,
    };

    // Update the candidate
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, candidateUpdates, { new: true });

    // Update constituencies if provided
    if (Array.isArray(req.body.constituency)) {
      // Fetch the current constituencies from the existing candidate
      const currentConstituencyIds = existingCandidate.constituency.map(c => c.toString());

      // Update each constituency
      for (const constituencyId of req.body.constituency) {
        const constituency = await Constituency.findById(constituencyId);
        if (!constituency) {
          return res.status(404).send(`Constituency with ID ${constituencyId} is invalid`);
        }

        // Check if candidate is already in the constituency
        if (!constituency.candidates.includes(candidate._id)) {
          constituency.candidates.push(candidate._id); // Add candidate to constituency
        }
        await constituency.save();
      }

      // Remove candidate from constituencies not included in the new list
      const constituenciesToRemove = currentConstitencyIds.filter(id => !req.body.constituency.includes(id));
      for (const id of constituenciesToRemove) {
        const constituency = await Constituency.findById(id);
        if (constituency) {
          constituency.candidates = constituency.candidates.filter(candidateId => !candidateId.equals(candidate._id)); // Remove candidate from constituency
          await constituency.save();
        }
      }
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

// Get all candidates with error handling enabled
router.get('/', async (req, res, next) => {
  try {
    // Extract the constituency query parameter
    const { constituency } = req.query;

    if (constituency) {
      const constituencies = await Constituency.find({ name: { "$regex": constituency, "$options": "i" } }) // Added case-insensitive search
        .populate({
          path: 'candidates',
          model: 'Candidate',
          populate: [
            {
              path: 'party',  // Populate party for each candidate
              model: 'Party',
            },
            {
              path: 'constituency',  // Populate constituency for each candidate
              model: 'Constituency',
            },
          ],
        });

      // Check if any constituencies were found
      if (constituencies.length === 0) {
        return res.json({ candidates: [] });
      }

      // Sort candidates by totalVotes in descending order
      const sortedCandidates = constituencies[0].candidates.sort((a, b) => b.totalVotes - a.totalVotes); // Sort in descending order

      return res.json(sortedCandidates);
    }

    // If no constituency is provided, fetch all candidates and populate their party and constituency
    const candidates = await Candidate.find()
      .populate('party constituency')
      .sort({ totalVotes: -1 }); // Sort by totalVotes in descending order

    res.json(candidates);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
