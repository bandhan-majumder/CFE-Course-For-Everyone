const { adminModel, courseModel } = require('../models/db.model.js')
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken')
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const { z } = require('zod')

const signup = async (req, res) => {

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
        await adminModel.create({
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

const signin = async (req, res) => {
    const {email, password} = req.body

    const admin = await adminModel.findOne({
        email
    })

    if (!admin) {
        res.status(403).json({
            "message": "You don't have admin access"
        })
    } else {
        const passCheck = bcrypt.compare(password, admin.password) // raw password being compared with hashed password

        if (passCheck) { // if the password matches, return a token
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_SECRET)
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

// will have to work on this later for uploading images in firebase
const createCourse = async (req, res) => {
    const adminId = req.userId
    const { title, description, imageUrl, price } = req.body
    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId // coming from middleware after req.userId is set from there
    })
    res.json({
        message: "Course created",
        courseId: course._id
    })
}

const updateCourse = async (req, res) => {
    const { title, description, imageUrl, price, courseId } = req.body

    const adminId = req.userId

    // at first check if there is course or not
    const courseExist = await courseModel.findOne({
        _id: courseId,
    })

    if (!courseExist) {
        res.status(403).json({
            "message": "Course does not exist"
        })
    }

    // if course exists, check if the user has created that or not
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },
        {
            // update 
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        }
    )

    if (course.matchedCount == 0) {
        res.status(403).json({
            "message": "You are not authorized to update course"
        })
    }

    res.json({
        message: "Course updated successfully",
        courseId: course._id
    })
}

const getMyCourse = async (req, res) => {
    const adminId = req.userId

    const allCourses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        allCourses
    })
}

module.exports = {
    signin: signin,
    signup: signup,
    updateCourse: updateCourse,
    getMyCourse: getMyCourse,
    createCourse: createCourse
}