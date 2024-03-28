const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser= require("body-parser")
const cors = require('cors')
const session= require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)

require('dotenv').config();

const mongoURI="mongodb://127.0.0.1:27017/infra_pricing"

// CORS options
const corsOptions = {
    origin: 'https://infra-pricing-tool-client.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add any other methods you wish to allow
    allowedHeaders: ['Content-Type', 'Authorization'] // You can customize this according to the headers you need
  };
  
  // Use cors with the above options
app.use(cors(corsOptions));

app.use(bodyParser())

const store=mongodbSession({
    uri:process.env.MONGODB_URI,
    collection:"session"
})

app.use(session({
    secret:"session_secret",
    resave:false,
    saveUninitialized: true,
    store:store,
    cookie: { secure: true }
}))

const regionRoutes=require("./controllers/admin/region")
app.use('/region',regionRoutes)

const serviceRoutes= require("./controllers/admin/service")
app.use('/service',serviceRoutes)

const infraRoutes=require("./controllers/admin/infra")
app.use("/infra",infraRoutes)

const googleOauth = require("./controllers/user/session/googleOauth")
app.get('/api/sessions/oauth/google',googleOauth)

const userRoutes=require('./routes/user')
app.use('/user',userRoutes)

const awsRoutes=require('./routes/aws/aws')
app.use('/aws',awsRoutes)

app.listen(5000,()=>{
    console.log('[+]Server is up and running on port 5000')
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('[+]DB connected')
    }).catch((e)=>{
        console.log('[+]Error in connecting to db')
    })
})