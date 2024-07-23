const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDb = mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', err => {
    console.log("Database connection failed", err.message);
});

db.once('open', () => {
    console.log("Database connection successful");
});

module.exports = {connectDb};

