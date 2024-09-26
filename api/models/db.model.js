const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const learnerSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    profilePicture: { type: String, default: 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1727332486~exp=1727333086~hmac=a379707835f518fdaac6b7d78b566fe324077ac6582cbcfd59eb59a9426938ce' }
})

const creatorSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    profilePicture: { type: String, default: 'https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?w=826&t=st=1727332566~exp=1727333166~hmac=9eb84788c496b0490e5af7ecef9776b2fe1a6de7e29562eebbac559c1cfd0ae3' }
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: { type: String, default: 'https://img.freepik.com/free-vector/teacher-online-learning-concept-illustration_114360-23587.jpg?t=st=1727332755~exp=1727336355~hmac=a84e317918652478d0b5616aae57666dc295c03a961ea382707ad43620240ac0&w=996' },
    creatorId: ObjectId,
})

const purchaseSchema = new Schema({
    courseId: ObjectId, 
    learnerId: ObjectId
})

const learnerModel = mongoose.model("learner", learnerSchema)
const creatorModel = mongoose.model("creator", creatorSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)

module.exports = {
    learnerModel: learnerModel,
    creatorModel: creatorModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}