const Inquiry = require("../../../models/inquiryModel")

async function deleteById(req,res){
    console.log('[+]Inquiry delete request ',req.query)
    const inquiry=await Inquiry.findByIdAndDelete(req.query.InquiryId)
    console.log('[+]Deleted inquiry ',inquiry)
    return res.json({
        error:false,
        message:"Deletion success"
    })
}

module.exports=deleteById