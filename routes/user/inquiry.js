const express = require('express')
const router = express.Router()

const createInquiry=require('../../controllers/user/inquiry/create')
const readById=require("../../controllers/user/inquiry/readById")
const deleteById= require("../../controllers/user/inquiry/delete")

router.post("/create",createInquiry)
router.get("/get",readById)
router.get("/delete",deleteById)

module.exports=router