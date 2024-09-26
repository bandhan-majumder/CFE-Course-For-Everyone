const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_LEARNER_SECRET = process.env.JWT_LEARNER_SECRET

function learnerMiddleware(req,res,next){
    const token = req.cookies.access_token; 
    if (!token) {
        return res.status(403).json({
            "success": false,
            "message": "You are not signed in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_LEARNER_SECRET); 
        req.learnerId = decoded.id;
        console.log("It's coming here..");
        next(); 
    } catch (error) {
        return res.status(403).json({
            "success": false,
            "message": "Invalid token"
        });
    }
}

module.exports = {
    learnerMiddleware: learnerMiddleware
}