const Mobile = require("../models/Mobile");
exports.getAllMobiles = async (req,res)=>{
    try{
        const mobiles = await Mobile.find();
        res.status(200).json(mobiles);
    }catch(err){
        return res.status(500).json({"message":"internal server error"});
    }
}