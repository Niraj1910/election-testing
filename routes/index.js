var express = require('express');
const isAdmin = require('../middleware/admin');
const Election = require('../models/election.model');
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



module.exports = router;
