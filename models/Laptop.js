const mongoose = require("mongoose");
const laptopSchema = new mongoose.Schema({
    pid:{type:String,required:true},
    pname:{type:String,required:true},
    pcost:{type:Number},
    pqty:{type:Number,required:true},
    pimg:{type:String,required:true}
})
module.exports=mongoose.model("Laptop",laptopSchema);