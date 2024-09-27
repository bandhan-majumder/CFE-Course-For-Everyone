const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_LEARNER_SECRET = process.env.JWT_LEARNER_SECRET

function learnerMiddleware(req,res,next){
    console.log(req.cookies)
    const token = req.cookies.access_token; 
    if (!token) {
        console.log("Yo 1")
        return res.status(403).json({
            "success": false,
            "message": "You are not signed in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_LEARNER_SECRET); 

        if(!decoded.learnerId){
            res.status(403).json({
                success: false,
                "message": "Join as a learner to see your courses"
            })
        }

        // if it is indeed a learner
        req.learnerId = decoded.learnerId;
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