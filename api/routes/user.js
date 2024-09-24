const { Router } = require('express')
const userRouter = Router()
const {userMiddleware} = require('../middleware/user.js')
const {signup, signin, purchasedCourses} = require('../controllers/auth.user.js')

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/purchases', userMiddleware, purchasedCourses )

module.exports = {
    userRouter: userRouter
}