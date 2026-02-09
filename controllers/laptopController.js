const Laptop = require("../models/Laptop");
exports.getAllLaptops = async (req,res)=>{
    try{
        const laptops = await Laptop.find();
        res.status(200).json(laptops);
    }catch(err){
        return res.status(500).json({"message":"internal server error"});
    }
}