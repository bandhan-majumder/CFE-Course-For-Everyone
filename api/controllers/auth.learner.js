const { learnerModel, purchaseModel, courseModel } = require('../models/db.model.js')
require('dotenv').config({ path: '../.env' });
const { z } = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_LEARNER_SECRET = process.env.JWT_LEARNER_SECRET

const signup = async (req, res, next) => {

    // validating learner input formats
    const rightSchema = z.object({
        email: z.string().email(),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]{2}/, "Password must contain at least two numbers")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character") // 
            .regex(/[{(\[]/, "Password must contain one opening bracket")
            .regex(/[)}\]]/, "Password must contain one closing bracket")
            .regex(/[/?]/, "Password must contain either one on these '/' '?'"),
        firstName: z.string(),
        lastName: z.string()
    })

    const safeParsed = await rightSchema.safeParse(req.body); // validating the input according to the defined schema

    // if the format is not correct
    if (!safeParsed.success) {
        return res.status(403).json({
            "message": "Invalid format. Make sure you give correct email and password. Password must contain one uppercase, one lowercase, 2 digits, one special character, one opening, one closing bracket, one '?' or '/'",
            "error": safeParsed.error
        })
    }

    // if the format is correct, 
    const { email, password, firstName, lastName } = req.body

    // hash pass word
    const hashedPassword = await bcrypt.hash(password, 5)

    // create the data table
    try {
        await learnerModel.create({
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

const signin = async (req, res, next) => {
    const { email, password } = req.body

    const learner = await learnerModel.findOne({
        email
    })

    if (!learner) {
        res.status(403).json({
            "message": "You don't have an account, sign up first"
        })
    } else {
        const passCheck = await bcrypt.compare(password, learner.password)

        if (passCheck) {
            const token = jwt.sign({
                learnerId: learner._id
            }, JWT_LEARNER_SECRET)

            const { password: pass, ...rest } = learner._doc
            rest.success = true
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest)
        } else {
            res.status(403).json({
                "message": "Wrong credentials"
            })
        }
    }
}

const oAuth = async (req, res) => {
    const email = req.body.email

    // check if the account already exists or not
    const accountExists = await learnerModel.findOne({
        email
    })

    // if found one, directly log them in
    if (accountExists) {
        const token = jwt.sign({
            learnerId: accountExists._id
        }, JWT_LEARNER_SECRET, { expiresIn: '1d' })
        const { password: pass, ...rest } = accountExists._doc
        rest.success = true
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)

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
            const newUser = await learnerModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

            const token = jwt.sign({
                learnerId: newUser._id
            }, JWT_LEARNER_SECRET, { expiresIn: '1d' })

            // detaching the password filed from the payload before sending as response
            const { password: pass, ...rest } = newUser._doc
            rest.success = true
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest)
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}

const purchasedCourses = async (req, res, next) => {
    const learnerId = req.learnerId

    if (!learnerId) {
        res.status(403).json({
            success: false,
            "message": "Sign in as learner to see your purchased courses"
        })
    }

    const purchasedCourses = await purchaseModel.find({
        learnerId
    })

    if (!purchasedCourses) {
        res.json({
            success: true,
            "message": "You have not bought any courses yet"
        })
    }

    const courseData = await courseModel.find({
        _id: { $in: purchasedCourses.map(x => x.courseId) }
    })

    res.json({
        "success": true,
        // send the purchased courses data
        courseData
    })
}

module.exports = {
    signin: signin,
    signup: signup,
    oAuth: oAuth,
    purchasedCourses: purchasedCourses
}