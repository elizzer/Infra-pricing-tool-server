const User= require('../../../models/userModel')

function isLogged(req,res,next){
    console.log("[+]user ",req.session.id)
    console.log("[+]user ",req.session)
    next()

}

module.exports=isLogged