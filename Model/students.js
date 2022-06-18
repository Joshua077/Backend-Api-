const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    }
})


const Student = mongoose.model("StudentInfo", StudentSchema)

module.exports={
    Student
}