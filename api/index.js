const express = require("express")
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { adminRouter } = require('./routes/admin')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const MONGO_URL = process.env.MONGO_URL
const cors = require('cors')

const app = express()

async function main(){
    await mongoose.connect(MONGO_URL)
    app.listen(3000)
}
main()

app.use(express.json())
app.use(cors())

app.use('/api/course', courseRouter);
app.use('/api/creator', adminRouter);
app.use('/api/learner', userRouter)
