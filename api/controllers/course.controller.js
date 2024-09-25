const { purchaseModel, courseModel } = require('../models/db.model.js')

const purchaseNewCourse = async (req, res, next) => {
    const learnerId = req.learnerId
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
    // logic to be added later : check if the learner actually paid the price or not

    const purchasedCourse = await purchaseModel.create({
        learnerId,
        courseId
    })

    res.json({
        "success": true,
        purchasedCourse
    })
}

const coursesPreview = async (req, res) => {
    // give me all the courses
    const courses = await courseModel.find({})
    res.json({
        "success": true,
        courses
    })
}

module.exports = {
    purchaseNewCourse: purchaseNewCourse,
    coursesPreview: coursesPreview
}