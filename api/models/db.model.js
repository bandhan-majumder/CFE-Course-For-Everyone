const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const learnerSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const creatorSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
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