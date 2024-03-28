const express = require('express');
const router = express.Router();
const Infra = require('../../models/infraModel'); // Assuming your model file is named infraModel.js
const Region = require('../../models/regionModel'); // Assuming your model file is named regionModel.js
const Service = require('../../models/serviceModel'); // Assuming your model file is named serviceModel.js

// Create a new infra entry
router.post('/', async (req, res) => {
    try {
        const { region_id, service_id, description, monthly_rate, first_12_month, currency, config_summary } = req.body;

        // Check if required fields are provided
        if (!region_id || !service_id || !description || !monthly_rate || !first_12_month || !currency || !config_summary) {
            return res.status(400).send({ error: 'Missing required fields' });
        }
        
        
        // Find the corresponding region and service based on the provided IDs
        const region = await Region.findOne({ region_id });
        const service = await Service.findOne({ service_id });
        
        // Check if region and service exist
        if (!region || !service) {
            return res.status(404).send({ error: 'Region or Service not found' });
        }
        
        const infraData = {
            region_id: region._id,
            service_id: service._id,
            description,
            monthly_rate,
            first_12_month,
            currency,
            config_summary
        };
        

        const infra = new Infra(infraData);
        await infra.save();
        res.status(201).send(infra);
    
        console.log("[*]",e)
        
    } catch (error) {
        // Handle specific error cases
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            return res.status(400).send({ error: error.message });
        } else {
            // Other types of errors
            res.status(500).send({ error: error });
        }
    }
});


// Get all infra entries
router.get('/', async (req, res) => {
    try {
        const infraEntries = await Infra.find().populate('region_id').populate('service_id');
        res.send(infraEntries);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get infra entry by ID
router.get('/:id', async (req, res) => {
    try {
        const infraEntry = await Infra.findById(req.params.id).populate('region_id').populate('service_id');
        if (!infraEntry) {
            return res.status(404).send();
        }
        res.send(infraEntry);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update infra entry by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'monthly_rate', 'first_12_month', 'currency', 'config_summary'];

    if (!updates.every(update => allowedUpdates.includes(update))) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const infra = await Infra.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!infra) {
            return res.status(404).send();
        }
        res.send(infra);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete infra entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const infra = await Infra.findByIdAndDelete(req.params.id);
        if (!infra) {
            return res.status(404).send();
        }
        res.send(infra);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
