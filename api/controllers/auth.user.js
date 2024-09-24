const { userModel, purchaseModel, courseModel } = require('../models/db.model.js')
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_USER_SECRET = process.env.JWT_USER_SECRET

const signup = async (req, res, next) => {

    // validating user input formats
    const rightSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]{2}/, "Password must contain at least two numbers")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character") // 
            .regex(/[{(\[]/, "Password must contain one opening bracket")
            .regex(/[)}\]]/, "Password must contain one closing bracket")
            .regex(/[/?\\|]/, "Password must contain either one on these '\' '/' '?' '|'"),
        firstName: z.string(),
        lastName: z.string()
    })

    const safeParsed = await rightSchema.safeParse(req.body); // validating the input according to the defined schema

    // if the format is not correct
    if (!safeParsed.success) {
        return res.status(403).json({
            "message": "Incorrect format",
            "error": safeParsed.error
        })
    }

    // if the format is correct, 
    const { email, password, firstName, lastName } = req.body

    // hash pass word
    const hashedPassword = await bcrypt.hash(password, 5)

    // create the data table
    try {
        await userModel.create({
            "email": email.toString(),
            "password": hashedPassword.toString(),
            "firstName": firstName.toString(),
            "lastName": lastName.toString()
        })
        res.json({
            "message": "Signed up successfully"
        })
    } catch {
        res.json({
            "Error": "error signing up"
        })
    }
}

const signin = async (req, res, next) => {
    const {email, password} = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        res.status(403).json({
            "message": "You don't have an account, sign up first"
        })
    } else {
        const passCheck = bcrypt.compare(password, user.password)

        if (passCheck) {
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_SECRET)
            res.json({
                token
            })
        } else {
            res.status(403).json({
                "message": "Wrong credentials"
            })
        }
    }
}

const purchasedCourses = async (req, res, next) => {
    const userId = req.userId

    const purchasedCourses = await purchaseModel.find({
        userId: userId
    })

    const courseData = await courseModel.find({
        _id: { $in: purchasedCourses.map(x => x.courseId) }
    })

    res.json({
        purchasedCourses,
        courseData
    })
}

module.exports = {
    signin: signin,
    signup: signup,
    purchasedCourses: purchasedCourses
}