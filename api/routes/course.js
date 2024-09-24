const { Router } = require('express')
const courseRouter = Router()
const {userMiddleware} = require('../middleware/user.js')
const { coursesPreview, purchaseNewCourse } = require('../controllers/course.controller.js')

courseRouter.post('/purchase', userMiddleware, purchaseNewCourse)

// show user all the available courses without authentication
courseRouter.get('/preview', coursesPreview)

module.exports = {
    courseRouter: courseRouter
}