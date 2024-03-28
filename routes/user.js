const express=require('express')
const router=express.Router()

const authRoutes= require('./user/auth')
const inquiryRoutes=require('./user/inquiry')

const isLogged= require('../controllers/user/auth/loggedIn')

router.use('/auth',authRoutes)
router.use('/inquiry',inquiryRoutes)

module.exports=router
