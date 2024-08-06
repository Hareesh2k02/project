const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"user"
    },
    bookId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"book"
    },
    book:{
        type:String,
        required:true
    },
    due:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()

    }
})

const schema = mongoose.model('request',requestSchema)
module.exports = schema