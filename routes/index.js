var express = require('express');
const isAdmin = require('../middleware/admin');
const Election = require('../models/election.model');
const Party = require('../models/party.model');
const Constituency = require('../models/constituency');
const Candidate = require('../models/candidates');
const AssemblyElection = require('../models/assembly-election.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.redirect('/dashboard');
});

router.get('/edit-election/:id', async function(req, res, next) {
  try {
    const electionId = req.params.id;
    console.log(electionId);
    const election = await Election.findById(electionId);
    console.log(election);
    if (!election) {
      return res.status(404).send('Election not found');
    }
    res.render('edit-election.ejs', { election });
  } catch (error) {
    next(error);
  }
});

router.get('/create-election', function(req, res, next) {
  return res.render('create-election.ejs')
});

router.get('/login', function(req, res, next) {
  console.log(req.session)
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login.ejs');
});

router.get('/dashboard', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.render('dashboard.ejs', {error: "you are not authorized to use this resource"});
  }
  res.render('dashboard.ejs', {error: null});
});

// create a party route 
router.get('/parties', async function(req, res, next) {
  try {
    const parties = await Party.find(); // Fetch all parties from the database
    return res.render('party.ejs', { parties });
  } catch (error) {
    console.log(error);
      res.status(500).send('Error fetching parties');
  }
});

// create party page
router.get('/create-party', function(req, res, next) {
  res.render('create-party.ejs');
});

router.get('/edit-party/:id', async function(req, res, next) {
  try {
    const partyId = req.params.id;
    const party = await Party.findById(partyId);
    if (!party) {
      return res.status(404).send('Party not found');
    }
    res.render('edit-party.ejs', { party });
  } catch (error) {
    next(error);
  }
});

// create constituency route
router.get('/constituency', async function(req, res, next) {
  try {
    const constituencies = await Constituency.find().populate({
      path: 'candidates',
      model: 'Candidate',
      populate: {
        path: 'party',
        model: 'Party',
      },
    }); // Fetch all constituencies from the database
    return res.render('constituency.ejs', { constituencies });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching constituencies');
  }
});

// create constituency page create-constituency
router.get('/create-constituency',async function(req, res, next) {
  const candidates = await Candidate.find();
  const errorMessages = req.flash('error');
  res.render('create-constituency.ejs', { candidates, error: errorMessages });
});

router.get('/edit-constituency/:id', async function(req, res, next) {
  try {
    const constituencyId = req.params.id;
    const constituency = await Constituency.findById(constituencyId).populate({
      path: 'candidates',
      model: 'Candidate',
      populate: {
        path: 'party',
        model: 'Party',
      },
    });
    if (!constituency) {
      return res.status(404).send('Constituency not found');
    }
    // get all the candidates 
    const candidates = await Candidate.find().populate('party');
    res.render('edit-constituency.ejs', { constituency, candidates, error: null });
  } catch (error) {
    console.log(error)
  }
});

router.get('/candidates', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page number from query params
    const limit = parseInt(req.query.limit) || 10; // Set the limit of items per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    const candidates = await Candidate.find()
      .populate('party constituency')
      .skip(skip) // Skip the items based on pagination
      .limit(limit); // Limit the number of items returned

    const totalCandidates = await Candidate.countDocuments(); // Get the total number of candidates

    // Calculate total pages
    const totalPages = Math.ceil(totalCandidates / limit);

    return res.render('candidate.ejs', {
      candidates: candidates || [],
      currentPage: page,
      totalPages,
      limit
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching candidates');
  }
});

router.get('/create-candidate', async function(req, res, next) {
  try {
    const parties = await Party.find(); // Fetch all parties 
    const constituencies = await Constituency.find(); // Fetch all constituencies
    return res.render('create-candidate.ejs', { parties, constituencies, error: null });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data for creating candidate');
  }
});

router.get('/edit-candidate/:id', async function(req, res, next) {
  try {
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId).populate('party constituency');
    if (!candidate) {
      return res.status(404).send('Candidate not found');
    }
    const parties = await Party.find(); // Fetch all parties 
    const constituencies = await Constituency.find(); // Fetch all constituencies
    res.render('edit-candidate.ejs', { candidate, parties, constituencies });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data for editing candidate');
  }
  

});

// create for assembly-election
router.get('/create-assembly-election', async function(req, res, next) {
  try {
    const constituencies = await Constituency.find(); // Fetch all constituencies
    return res.render('create-assembly-election.ejs', { constituencies, error: null });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data for creating assembly election');
  }
});


// create for edit assembly-election
router.get('/edit-assembly-election/:id', async function(req, res, next) {
  try {
    const electionId = req.params.id;
    const assemblyElection = await AssemblyElection.findById(electionId);
    if (!assemblyElection) {
      return res.status(404).send('Assembly election not found');
    }
    const elections = await Election.find(); // Fetch all elections 
    const constituencies = await Constituency.find(); // Fetch all constituencies
    res.render('edit-assembly-election.ejs', { assemblyElection, elections, constituencies });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data for editing assembly election');
  }
});

// get route for show the assembly-election
router.get('/assembly-election', async function(req, res, next) {
  try {
    const assemblyElections = await AssemblyElection.find().populate('constituencies'); // Fetch all elections
    res.render('assembly-election.ejs', { assemblyElections });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching assembly election');
  }
});

router.get('/cons-candidates', async function(req, res, next) {
  try {
    const constituencies = await Constituency.find();
    const parties = await Party.find();

    if (req.query.cons) {
      // Find constituency by name (case-insensitive) and fetch candidates associated with it
      const constituency = await Constituency.findOne({ name: { $regex: req.query.cons, $options: 'i' } });

      // If the constituency does not exist, render empty candidates array
      const candidates = constituency 
        ? await Candidate.find({ constituency: constituency._id })
            .populate('party')
            .sort({ totalVotes: -1 }) // Sort candidates by totalVotes in descending order
        : [];
      
      return res.render('cons-candidates.ejs', {
        candidates,
        constituencies,
        parties,
        selectedCons: req.query.cons, // Pass selected constituency name to the template
      });
    }

    // Render with all candidates if no constituency selected
    const candidates = await Candidate.find()
      .populate('party')
      .sort({ totalVotes: -1 }); // Sort all candidates by totalVotes in descending order

    res.render('cons-candidates.ejs', {
      candidates,
      constituencies,
      parties,
      selectedCons: '', // No constituency selected by default
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching candidates.');
  }
});





module.exports = router;
