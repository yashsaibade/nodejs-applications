const Watch = require("../models/Watch");
exports.getAllWatches = async (req,res)=>{
    try{
        const watches = await Watch.find();
        res.status(200).json(watches);
    }catch(err){
        return res.status(500).json({"message":"internal server error"});
    }
}