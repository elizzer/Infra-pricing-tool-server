const express = require('express');
const router = express.Router();
const Service = require('../../models/serviceModel'); // Assuming your model file is named serviceModel.js

// Create a new service
router.post('/', async (req, res) => {
    console.log('[+]Service body', req.body);
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        // Check if the error is a duplicate key error (code 11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.service_id) {
            // If the error is due to a duplicate service_id value, send a custom error message
            res.status(400).send({ error: 'Duplicate service_id value' });
        } else {
            // For other errors, send the default error response
            res.status(400).send(error);
        }
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findOne({ service_id: req.params.id });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update service by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['service_id', 'service_name', 'service_descp']; // Specify the fields you want to allow updates for
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const service = await Service.findOneAndUpdate({ service_id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete service by ID
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ service_id: req.params.id });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
