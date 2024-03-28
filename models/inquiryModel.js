const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cloudProvider: {
        type: String,
        required: true 
    },
    region: {
        type: String,
        required: true 
    },
    companyName: {
        type: String,
        required: true 
    },
    products: [{
        name: {
            type: String,
            required: true 
        },
        term: {
            type: String,
            required: true 
        },
        users: {
            type: String,
            required: true 
        }
    }],
    totalPrice:{
        type:Number,
        default:0
    }
});

const InquiryModel = mongoose.model('Inquiry', inquirySchema);

module.exports = InquiryModel;
