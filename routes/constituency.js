const express = require('express');
const { body, validationResult } = require('express-validator');
const Constituency = require('../models/constituency');
const Joi = require('joi');
const Candidate = require('../models/candidates');
const router = express.Router();

// Middleware for authentication (example)
// const { authenticate } = require('../middleware/auth');
const constituencySchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    state: Joi.string().required().messages({
        'string.empty': 'State is required',
    }),
    totalVotes: Joi.number().required().messages({
        'number.base': 'Total votes must be a number',
    }),
    candidates: Joi.array().optional(),
});

router.post(
    '/',
    async (req, res, next) => {
        // Validate the request body against the Joi schema
        const { error } = constituencySchema.validate(req.body);
        
        if (error) {
            req.flash('error', error.details[0].message); // Set the validation error
            return res.redirect('/create-constituency');
        }
        
        try {
            const existingConstituency = await Constituency.findOne({ 
                name: req.body.name, 
                state: req.body.state 
            });
            if (existingConstituency) {
                req.flash('error', 'Constituency already exists!');
                return res.redirect('/create-constituency');
            }
            
            const constituency = new Constituency(req.body);
            await constituency.save();

            if(req.body.candidates){
                for(let candidate of req.body.candidates){
                    await Candidate.findByIdAndUpdate(candidate, {
                        constituency: constituency._id
                    }, {new: true}).exec();
                }
            }
            return res.status(200).json(constituency);
        } catch (error) {
            console.log(error);
            req.flash('error', error.message);
            res.redirect('/create-constituency');
        }
    }
);

// Get all constituencies
router.get('/', async (req, res, next) => {
    try {
        const constituencies = await Constituency.find().populate('candidates').sort({'name': 1});
        res.json(constituencies);
    } catch (error) {
        next(error);
    }
});

// Get a single constituency by ID
router.get('/:id', async (req, res, next) => {
    try {
        const constituency = await Constituency.findById(req.params.id).populate('candidates');
        if (!constituency) return res.status(404).send('Constituency not found');
        res.json(constituency);
    } catch (error) {
        next(error);
    }
});

// Update a constituency by ID
router.put('/:id', async (req, res, next) => {
    const { error } = constituencySchema.validate(req.body);

    if (error) {
        req.flash('error', error.details[0].message); // Set the validation error
        return res.redirect(`/edit-constituency/${req.params.id}`);
    }

    try {
        // Fetch the existing constituency before updating
        const existingConstituency = await Constituency.findById(req.params.id).populate('candidates');
        if (!existingConstituency) return res.status(404).send('Constituency not found');

        // Extract candidate IDs from the request body
        const newCandidateIds = req.body.candidates || [];

        // Find candidates that were removed
        const removedCandidates = existingConstituency.candidates.filter(
            (candidate) => !newCandidateIds.includes(String(candidate._id))
        );

        // Update removed candidates, setting their constituency to null
        const updatePromises = removedCandidates.map((candidate) =>
            Candidate.findByIdAndUpdate(candidate._id, { constituency: null })
        );
        await Promise.all(updatePromises); // Wait for all updates to complete

        // Update the constituency with the new data
        const updatedConstituency = await Constituency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedConstituency);
    } catch (error) {
        console.error(error);
        req.flash('error', error.message);
        res.redirect(`/edit-constituency/${req.params.id}`);
    }
});


// Delete a constituency by ID
router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        const constituency = await Constituency.findByIdAndDelete(req.params.id);
        if (!constituency){
            return res.status(404).send('Constituency not found');
        }
        res.json({ message: 'Constituency deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        next(error);
    }
});

module.exports = router;
