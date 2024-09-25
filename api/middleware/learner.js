const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_LEARNER_SECRET = process.env.JWT_LEARNER_SECRET

function learnerMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_LEARNER_SECRET)
    if(decoded){
        req.learnerId = decoded.id
        next()
    } else {
        req.status(403).json({
            "success": false,
            "message": "You are not signed in"
        })
    }
}

module.exports = {
    learnerMiddleware: learnerMiddleware
}