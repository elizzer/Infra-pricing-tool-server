const express = require('express')


const router = express.Router()

const inquiryController=require('../../controllers/AWS/inquire')

router.get('/inqury',inquiryController)

module.exports=router