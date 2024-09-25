const { Router } = require('express')
const courseRouter = Router()
const {learnerMiddleware} = require('../middleware/learner.js')
const { coursesPreview, purchaseNewCourse } = require('../controllers/course.controller.js')

courseRouter.post('/purchase', learnerMiddleware, purchaseNewCourse)

// show learner all the available courses without authentication
courseRouter.get('/preview', coursesPreview)

module.exports = {
    courseRouter: courseRouter
}