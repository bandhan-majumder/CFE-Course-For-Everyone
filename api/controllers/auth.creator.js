const { creatorModel, courseModel } = require('../models/db.model.js')
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken')
const JWT_CREATOR_SECRET = process.env.JWT_CREATOR_SECRET
const { z } = require('zod')

const signup = async (req, res) => {

    // validating creator input formats
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
            "success": false,
            "message": "Incorrect email or password format. Password must contain one uppercase, one lower case, 2 digits, one special characters and any of these '/''?' and one opening and one closing bracket",
            "error": safeParsed.error
        })
    }

    // if the format is correct, 
    const { email, password, firstName, lastName } = req.body

    // hash pass word
    const hashedPassword = await bcrypt.hash(password, 5)

    // create the data table
    try {
        await creatorModel.create({
            "email": email.toString(),
            "password": hashedPassword.toString(),
            "firstName": firstName.toString(),
            "lastName": lastName.toString()
        })
        res.json({
            "success": true,
            "message": "Signed up successfully"
        })
    } catch {
        res.json({
            "success": false,
            "Error": "error signing up"
        })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    const creator = await creatorModel.findOne({
        email
    })

    if (!creator) {
        return res.status(403).json({
            "success": false,
            "message": "You don't have creator access"
        })
    }

    const passCheck = await bcrypt.compare(password, creator.password) // raw password being compared with hashed password

    if (passCheck) { // if the password matches, return a token
        const token = jwt.sign({
            creatorId: creator._id
        }, JWT_CREATOR_SECRET)

        console.log("Token is ", token)
        const { password: pass, ...rest } = creator._doc
        rest.success = true
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)
    } else {
        res.status(403).json({
            "success": false,
            "message": "Wrong credentials"
        })
    }

}

const oAuth = async (req, res) => {
    const email = req.body.email

    // check if the account already exists or not
    const accountExists = await creatorModel.findOne({
        email
    })

    // if found one, directly log them in
    if (accountExists) {
        res.json({
            "user": accountExists,
            success: true,
            message: "Signed in successfully"
        })
    } else { // if the account does not exist, create one

        // generate a random password
        function generatePassword() {
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
            const numberChars = '0123456789';
            const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            const openingBrackets = '({[';
            const closingBrackets = ')}]';
            const specialCharsWithSlash = '/\\?|';

            let password = '';

            // Generate at least one uppercase letter
            password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];

            // Generate at least one lowercase letter
            password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];

            // Generate at least two numbers
            password += numberChars[Math.floor(Math.random() * numberChars.length)];
            password += numberChars[Math.floor(Math.random() * numberChars.length)];

            // Generate at least one special character
            password += specialChars[Math.floor(Math.random() * specialChars.length)];

            // Generate one opening bracket
            password += openingBrackets[Math.floor(Math.random() * openingBrackets.length)];

            // Generate one closing bracket
            password += closingBrackets[Math.floor(Math.random() * closingBrackets.length)];

            // Generate one special character with slash
            password += specialCharsWithSlash[Math.floor(Math.random() * specialCharsWithSlash.length)];

            // Generate remaining characters randomly
            while (password.length < 8) {
                const charSet = uppercaseChars + lowercaseChars + numberChars + specialChars;
                password += charSet[Math.floor(Math.random() * charSet.length)];
            }

            // Shuffle the password
            return password
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('');
        }

        const nameArr = req.body.name.toLowerCase().split(" ")
        const firstName = nameArr[0]
        const lastName = ((Math.floor(Math.random() * 1000) + 23459009123).toString()).slice(-3);
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 5)

        try {
            const newUser = await creatorModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

            const token = jwt.sign({
                adminId: newUser._id
            }, JWT_CREATOR_SECRET, { expiresIn: '1d' })

            console.log("Token inside auth: ", token)
            // detaching the password filed from the payload before sending as response
            const { password: pass, ...rest } = newUser._doc
            rest.success = true
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest)
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error signing up",
                error: error.message,
            });
        }
    }
}

// will have to work on this later for uploading images in firebase
const createCourse = async (req, res) => {
    const creatorId = req.creatorId
    const { title, description, imageUrl, price } = req.body
    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: creatorId // coming from middleware after req.creatorId is set from there
    })
    res.json({
        success: true,
        message: "Course created",
        courseId: course._id
    })
}

const updateCourse = async (req, res) => {
    const { title, description, imageUrl, price, courseId } = req.body

    const creatorId = req.creatorId

    // at first check if there is course or not
    const courseExist = await courseModel.findOne({
        _id: courseId,
    })

    if (!courseExist) {
        res.status(403).json({
            "message": "Course does not exist"
        })
    }

    // if course exists, check if the creator has created that or not
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: creatorId
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
        "success": true,
        message: "Course updated successfully",
        courseId: course._id
    })
}

const getMyCourse = async (req, res) => {
    const creatorId = req.creatorId

    const allCourses = await courseModel.find({
        creatorId: creatorId
    })

    res.json({
        "success": true,
        allCourses
    })
}

module.exports = {
    signin: signin,
    signup: signup,
    oAuth: oAuth,
    updateCourse: updateCourse,
    getMyCourse: getMyCourse,
    createCourse: createCourse
}