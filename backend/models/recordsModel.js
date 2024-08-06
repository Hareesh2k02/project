const mongoose = require("mongoose")

const recordsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true

    },
    bookId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'book',
        required:true
    },
    borrowId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'borrow',
        required:true
    },
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    book:{
        type:String,
        required:true
    },
    issuedDate:{
        type:Date,
        default:Date.now()
    },
    returnDate:{
        type:Date
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }

})

let schema = mongoose.model("records",recordsSchema)
module.exports = schema