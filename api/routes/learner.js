const { Router } = require('express')
const learnerRouter = Router()
const {learnerMiddleware} = require('../middleware/learner.js')
const {signup, signin, purchasedCourses, oAuth, logOut} = require('../controllers/auth.learner.js')

learnerRouter.post('/signup', signup)

learnerRouter.post('/signin', signin)

learnerRouter.post('/oAuth', oAuth)

learnerRouter.get('/purchases', learnerMiddleware, purchasedCourses )

learnerRouter.post('/logout', learnerMiddleware, logOut)

module.exports = {
    learnerRouter: learnerRouter
}