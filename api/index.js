const express = require("express");
const { learnerRouter } = require('./routes/learner');
const { courseRouter } = require('./routes/course');
const { creatorRouter } = require('./routes/creator');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const MONGO_URL = process.env.MONGO_URL;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

async function main() {
    await mongoose.connect(MONGO_URL);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
main();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/course', courseRouter);
app.use('/api/creator', creatorRouter);
app.use('/api/learner', learnerRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});