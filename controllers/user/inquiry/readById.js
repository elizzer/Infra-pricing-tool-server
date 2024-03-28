const Inquiry = require("../../../models/inquiryModel")
const AWS_GETS=require("../../AWS/inquire")


async function readById(req,res){
    const inquiryId=req.query.userId

    const inquiryList= await Inquiry.find({userId:inquiryId}).select('-products._id')
    //go throught the list of product and calculate the total price
    let totalPrice=0
    for(const inquiry of inquiryList){
        for (const product of inquiry.products){
            if (product.name === 'Product1') {
                totalPrice += await AWS_GETS(product);
            } else {
                totalPrice += 0;
            }
        }
        inquiry.totalPrice=totalPrice.toFixed(3)
        totalPrice=0
    }
    return res.json(inquiryList)
}

module.exports=readById