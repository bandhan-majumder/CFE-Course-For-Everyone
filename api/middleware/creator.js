const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_CREATOR_SECRET = process.env.JWT_CREATOR_SECRET

function creatorMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_CREATOR_SECRET)
    if(decoded){
        req.learnerId = decoded.id
        console.log("It's coming here..")
        next()
    } else {
        req.status(403).json({
            "success": false,
            "message": "You are not signed in"
        })
    }
}

module.exports = {
    creatorMiddleware: creatorMiddleware
}