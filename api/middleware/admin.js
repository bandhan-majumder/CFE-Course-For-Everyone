const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET

function adminMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET)
    if(decoded){
        req.userId = decoded.id
        console.log("It's coming here..")
        next()
    } else {
        req.status(403).json({
            "message": "You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}