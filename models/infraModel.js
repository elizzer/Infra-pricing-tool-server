const mongoose= require('mongoose')

const infraSchema = mongoose.Schema({
    region_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Region"
    },
    service_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
    description:String,
    monthly_rate:Number,
    first_12_month:Number,
    currency:{
        type:String,
        enum:["USD","INR"]
    },
    config_summary:String
},{
    timestamps:true
})

Infra=mongoose.model("Infra",infraSchema)
module.exports=Infra