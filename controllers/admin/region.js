const express = require('express');
const router = express.Router();
const Region = require('../../models/regionModel'); // Assuming your model file is named RegionModel.js

// Create a new region
router.post('/', async (req, res) => {
    console.log('[+]Region body', req.body);
    try {
        const region = new Region(req.body);
        await region.save();
        res.status(201).send(region);
    } catch (error) {
        // Check if the error is a duplicate key error (code 11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.region_id) {
            // If the error is due to a duplicate region_id value, send a custom error message
            res.status(400).send({ error: 'Duplicate region_id value' });
        } else {
            // For other errors, send the default error response
            res.status(400).send(error);
        }
    }
});

// Get all regions
router.get('/', async (req, res) => {
    try {
        const regions = await Region.find();
        res.send(regions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get region by ID
router.get('/:id', async (req, res) => {
    try {
        const region = await Region.findOne({region_id:req.params.id});
        if (!region) {
            return res.status(404).send();
        }
        res.send(region);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update region by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['region_id', 'region_name']; // Specify the fields you want to allow updates for
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const region = await Region.findOneAndUpdate({region_id:req.params.id}, req.body, { new: true, runValidators: true });
        if (!region) {
            return res.status(404).send();
        }
        res.send(region);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete region by ID
router.delete('/:id', async (req, res) => {
    try {
        const region = await Region.findOneAndDelete({region_id:req.params.id});
        if (!region) {
            return res.status(404).send();
        }
        res.send(region);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
