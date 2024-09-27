const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const JWT_CREATOR_SECRET = process.env.JWT_CREATOR_SECRET

function creatorMiddleware(req, res, next) {
    const token = req.cookies.access_token;
    console.log("Token reaching ?" , token)
    if (!token) {
        return res.status(403).json({
            "success": false,
            "message": "You are not signed in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_CREATOR_SECRET); 
        req.creatorId = decoded.creatorId;
        next(); 
    } catch (error) {
        console.log(error)
        console.log(token)
        return res.status(403).json({
            "success": false,
            "message": "Invalid token"
        });
    }
}

module.exports = {
    creatorMiddleware: creatorMiddleware
}