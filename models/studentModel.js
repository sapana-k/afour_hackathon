const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentID: Number,
    studentName: String,
    studentEmail: String,
    studentPhone: Number
});  
const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;
