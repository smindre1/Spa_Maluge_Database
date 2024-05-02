require('dotenv').config();
const mongoose = require('mongoose');
console.log("connection");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SpaMalugeReservationSystem');


module.exports = mongoose.connection;
