const mongoose = require("mongoose")

const borrowSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"user"
    },
    bookId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"book"
    },
    quantity:{
        type:Number,
        default:1
    },
    dueDate:{
        type:Date,
        required:true
    },
    issuedDate:{
        type:Date,
        default:Date.now()
    }
})

let schema = mongoose.model('borrow',borrowSchema)
module.exports= schema
