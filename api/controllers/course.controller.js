const { purchaseModel, courseModel } = require('../models/db.model.js')

const purchaseNewCourse = async (req, res, next) => {
    const userId = req.userId
    const courseId = req.body.courseId

    const courseExists = await courseModel.findOne({
        _id: courseId
    })

    if(!courseExists){
        res.status(404).json({
            "message": "Course not found."
        })
    }

    // if course exists
    // logic to be added later : check if the user actually paid the price or not

    const purchasedCourse = await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        purchasedCourse
    })
}

const coursesPreview = async (req, res) => {
    // give me all the courses
    const courses = await courseModel.find({})
    res.json({
        courses
    })
}

module.exports = {
    purchaseNewCourse: purchaseNewCourse,
    coursesPreview: coursesPreview
}