const axios= require('axios')
const qs = require('qs')

const User= require("../../../models/userModel")

async function getGoogleOAuthTOken(code){
    const url='https://oauth2.googleapis.com/token'

    const value={
        code,
        client_id:process.env.GOOGLE_CLIENT_ID,
        client_secret:process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type:"authorization_code",

    };

    try{
        const res=await axios.post(url,qs.stringify(value),
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })

        return res.data
    }catch(e){
        console.error("[+]Unable to fetch google oAuth token due to ",e.message)
        throw new Error(e.message)
    }
}

async function getGoogleUser(id_token,access_token){
    const url=`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    console.log('[+]Get google user data URL',url)
    try{
        const res= await axios.get(url,{
            headers:{
                'Authorization':`Bearer ${id_token}`
            }
        })

        return res.data
    }catch(e){
        console.log('[+]Unable to fetch google user data')
    }
}

async function googleOauth(req, res) {
    console.log('[+] Google oauth server request');
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).send("Authorization code is missing.");
        }

        const token_data = await getGoogleOAuthTOken(code);
        console.log('[+] Token received ', token_data);

        if (!token_data.id_token || !token_data.access_token) {
            return res.status(400).send("Invalid token data received from Google.");
        }

        const userData = await getGoogleUser(token_data.id_token, token_data.access_token);
        console.log('[+] Google user data ', userData);

        // Verify if the Google account is verified
        if (!userData.verified_email) {
            return res.status(403).send("Google account not verified");
        }

        // Add the user to the DB
        const user = await User.findOneAndUpdate({
            email: userData.email
        }, {
            email: userData.email,
            name: userData.name,
            login_type: "google"
        }, {
            new: true,
            upsert: true
        });

        req.session.user=user._id
        console.log('[+]User id ',user._id)
        return res.json({
            error: false,
            status: "user created",
            user
        });
    } catch (e) {
        console.error('[!] Error in Google OAuth:', e.message);
        return res.status(500).send("An error occurred during the Google OAuth process.");
    }
}


module.exports=googleOauth