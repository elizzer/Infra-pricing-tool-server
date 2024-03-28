const {hash}= require('../../utills/hash')
const User= require('../../../models/userModel')

async function registerController(req, res) {
    const { email, name, password } = req.body;
    console.log('[+]Register data ', req.body);
    if (!email || !name || !password) {
        return res.json({
            error: true,
            message: "No fields should be empty"
        });
    }

    try {
        let hashedPassword = await hash(password); // Assuming hash() is a valid async function that hashes the password
        console.log('[+]Hashed password ', hashedPassword);
        const userData = {
            email,
            name,
            password: hashedPassword,
        };

        const newUser = new User(userData);
        await newUser.save();

        // If save was successful, send a success response back
        res.json({
            error: false,
            message: "User registered successfully.",
            user:{
                email,
                name
            }
        });
    } catch (error) {
        // MongoDB will throw an error with code 11000 for duplicate keys
        if (error.code === 11000) {
            res.json({
                error: true,
                message: "Email already exists."
            });
        } else {
            // Handle other possible errors
            res.json({
                error: true,
                message: "An error occurred during registration."
            });
        }
    }
}


module.exports=registerController