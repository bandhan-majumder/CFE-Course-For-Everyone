const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_USER_SECRET = process.env.JWT_USER_SECRET

function userMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_USER_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    } else {
        req.status(403).json({
            "success": false,
            "message": "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}