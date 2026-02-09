const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require('node:dns');
const authMiddleware = require("./middleware/authMiddleware");
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/test",(req, res)=>{
    res.send("Hello from Backend!");
});
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api",[authMiddleware],require("./routes/laptopRoutes"));
app.use("/api",[authMiddleware],require("./routes/mobileRoutes"));
app.use("/api",[authMiddleware],require("./routes/watchRoutes"));
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB Connected");
    app.listen(process.env.PORT ||5000,'0.0.0.0',() => {
        console.log("Server Started on", process.env.PORT);
    });
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
});