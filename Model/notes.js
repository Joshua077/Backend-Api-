const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    tittle:{
        type:String,
        required: true,
        unique:true,
    },
    comments:{
        type:String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})


const Note = mongoose.model("Note", notesSchema)

module.exports={
    Note
}