const Inquiry = require("../../../models/inquiryModel")
const AWS_GETS=require("../../AWS/inquire")

async function createInquiry(req,res){

    try{

        console.log('[+]new inquiry data ',req.body)

        const {userId,cloudProvider,region,companyName,products}=req.body

        if (!cloudProvider || !region || !companyName || !products) {
            return res.json({
                error: true,
                message: 'Missing required fields'
            });
        }

        if (products.length === 0 ) {
            return res.json({
                error: true,
                message: 'atleast there shoud be one product'
            });
        }

        let totalPrice=0

        // for (const product of products) {
        //     if (product.name === 'Product1') {
        //       totalPrice += await AWS_GETS(product);
        //     } else {
        //       totalPrice += 0;
        //     }
        //   }

        // console.log("[+]Total price ",totalPrice)
        // totalPrice=totalPrice.toFixed(4)
        const newInquiry = new Inquiry({
            userId,
            cloudProvider,
            region,
            companyName,
            products,
            totalPrice
        })

        const inquiry = await newInquiry.save()

        return res.json({
            error:false,
            message:"Inquiry created successfully ",
            inquiry
        })

    }catch(e){
        return res.json({
            error:true,
            message:e.message
        })
    }
}

module.exports=createInquiry