const { Router } = require('express')
const creatorRouter = Router()
const {signup, signin, createCourse, updateCourse, getMyCourse, oAuth} = require('../controllers/auth.creator.js')
const { creatorMiddleware } = require('../middleware/creator.js')

// const course = require('./course.js')

creatorRouter.post('/signup', signup)

creatorRouter.post('/signin', signin)

creatorRouter.post('/oAuth', oAuth)

creatorRouter.post('/create/course', creatorMiddleware, createCourse)

creatorRouter.put('/update/course', creatorMiddleware, updateCourse)

creatorRouter.get('/course/bulk', creatorMiddleware, getMyCourse)

module.exports = {
    creatorRouter: creatorRouter
} 