const { Router } = require('express')
const adminRouter = Router()
const {signup, signin, createCourse, updateCourse, getMyCourse} = require('../controllers/auth.admin.js')
const { adminMiddleware } = require('../middleware/admin.js')

// const course = require('./course.js')

adminRouter.post('/signup', signup)

adminRouter.post('/signin', signin)

adminRouter.post('/create/course', adminMiddleware, createCourse)

adminRouter.put('/update/course', adminMiddleware, updateCourse)

adminRouter.get('/course/bulk', adminMiddleware, getMyCourse)

module.exports = {
    adminRouter: adminRouter
} 