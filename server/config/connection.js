require('dotenv').config();
const mongoose = require('mongoose');
console.log("connection");
mongoose.connect("mongodb+srv://testuser:U4osbIAuBdufMeL8@cluster0.cm2hdfp.mongodb.net/SpaMalugeReservationSystem?retryWrites=true&w=majority&appName=Cluster0" || 'mongodb://127.0.0.1:27017/SpaMalugeReservationSystem');


module.exports = mongoose.connection;
