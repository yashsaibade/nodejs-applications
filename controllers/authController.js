const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
exports.register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.status(400).json({"message": "User Already Registered"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        });

        await newUser.save();

        res.status(200).json({ "message": "Registration Success" });

    }catch(err){
        res.status(500).json({ "message": err.message });
    }
};

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const db_user = await User.findOne({email});
        if(!db_user){
            return res.status(400).json({"message": "Invalid Credentials"});
        }

        const flag = await bcrypt.compare(password,db_user.password);
        if(!flag){
            return res.status(400).json({"message": "Invalid Credentials"});
        }
        const token = jwt.sign({_id:db_user._id},process.env.JWTSECRETE,{expiresIn:process.env.EXPIRES_IN});
        res.status(200).json(
            { "message": "Login Success",
                token 
            });

    }catch(err){
        return res.status(500).json({ "message": "server side error" });
    }  
}

exports.forgetPassword = async (req,res)=>{
    try{
        const {email} = req.body;
        const db_user = await User.findOne({email});
        if(!db_user){
            return res.status(400).json({"message":"User not found"});
        }

        token = crypto.randomBytes(32).toString("hex");
        db_user.resetToken = token;
        db_user.resetTokenExpire = Date.now() + 10*60*1000;
        db_user.save();

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });

        const resetLink = `http://localhost:8000/api/auth/reset-password/${token}`;

        await transporter.sendMail({
            to:db_user.email,
            subject:"Password Reset Link",
            html:`<p>Click Below Link to Reset Password :</p>
                 <a href="${resetLink}">${resetLink}</a>`
        });
        res.status(200).json({"message":"Reset Link Sent to Your Email"});
    }catch(err){
        console.log(err);
        res.status(500).json({"message":"Server Side Error"});
    }
}

exports.resetPassword = async (req,res)=>{
    
    try{
        const {password} = req.body;
        const {token} = req.params;
        const db_user = await User.findOne({
            resetToken:token,
            resetTokenExpire:{$gt:Date.now()}
        });
        if(!db_user){
            return res.status(400).json({"message":"Token Expired and Try Again"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        db_user.password = hashedPassword;
        db_user.resetToken = undefined;
        db_user.resetTokenExpire = undefined;
        await db_user.save();
        res.status(200).json({"message":"Password Reset Successfully !!!"});
    }catch(err){
        res.status(500).json({"message":"Internal Server Error"});
    }
}