const User= require('../../../models/userModel')
const {verifyHash}= require('../../utills/hash')

async function loginController(req, res) {
    console.log('[+]Login request');
    console.log(req.session.id)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Please provide both email and password."
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Invalid email or password."
            });
        }
        const isMatch = await verifyHash(password,user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: "Invalid email or password."
            });
        }

        req.session.user=user._id
        console.log('[+]User id ',user._id)
        console.log('[+]User session ',req.session)
        console.log('[+]User session id ',req.session.id)

        res.json({
            error: false,
            message: "Login successful.",
            userData:{
                email:user.email,
                name:user.name,
                _id:user._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "An error occurred while processing your request."
        });
    }
}

module.exports = loginController;
