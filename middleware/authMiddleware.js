const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    try{
        const client_token = req.headers.authorization;
        if(!client_token || !client_token.startsWith("Bearer ")){
            return res.status(400).json({"message": "token missing"});
        }

        const token = client_token.split(" ")[1];
        const flag = jwt.verify(token, process.env.JWTSECRETE);
        if(flag){
            next();
        }else{
            return res.status(401).json({"message": "Invalid token"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({"message": "Server Side Error"});
    }
}
module.exports = authMiddleware;