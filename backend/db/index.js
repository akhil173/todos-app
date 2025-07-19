const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config/config');

const connect = () => mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);
    });

module.exports = connect;