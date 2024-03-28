const express= require('express')
const router=express.Router()

const loginController=require('../../controllers/user/auth/login')
const registerController=require('../../controllers/user/auth/register')

router.post('/login',loginController)
router.post('/register',registerController)

module.exports=router