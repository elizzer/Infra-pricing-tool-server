const mongoose= require("mongoose")

const serviceSchema = mongoose.Schema({
    service_id:{
        type:Number,
        required:true,
        unique:true
    },
    service_name:{
        type:String,
        required:true
    },
    service_descp:String
},{
    timestamps:true
})

const Service = mongoose.model("Service",serviceSchema)

module.exports=Service