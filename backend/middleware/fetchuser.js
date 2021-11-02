const jwt = require('jsonwebtoken');
const jwt_key = "amiteamizbtumi";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:'Invalid token, authorization denied'})
    }
    try {
        const data = jwt.verify(token,jwt_key);
    req.user = data;
    next();
    } catch (error) {
        res.status(401).json({error:'No token, authorization denied'});
    }
    
}

module.exports = fetchuser