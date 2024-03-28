const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
    },
    login_type:{
        type:String,
        enum:["google","default"],
        default:'default'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
