const { Router } = require('express')
const learnerRouter = Router()
const {learnerMiddleware} = require('../middleware/learner.js')
const {signup, signin, purchasedCourses, oAuth} = require('../controllers/auth.learner.js')

learnerRouter.post('/signup', signup)

learnerRouter.post('/signin', signin)

learnerRouter.post('/oAuth', oAuth)

learnerRouter.get('/purchases', learnerMiddleware, purchasedCourses )

module.exports = {
    learnerRouter: learnerRouter
}