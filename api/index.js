const express = require("express")
const { learnerRouter } = require('./routes/learner')
const { courseRouter } = require('./routes/course')
const { creatorRouter } = require('./routes/creator')
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
app.use('/api/creator', creatorRouter);
app.use('/api/learner', learnerRouter)
