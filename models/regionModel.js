const mongoose = require('mongoose');

const RegionSchema = new mongoose.Schema({
    region_id: {
        type: Number,
        required: true,
        unique:true
    },
    region_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Region = mongoose.model('Region', RegionSchema);

module.exports = Region;
