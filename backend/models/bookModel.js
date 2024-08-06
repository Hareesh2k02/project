const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:[200,'book name cannot exceed 100 charecter'],
        required:[true,"please enter book name"],
        trim:true
    },
    author:{
        type:String,
        required:[true,"please enter the author name"],
        maxLength:[20,'author name cannot exceed 20 charecter']
    },
    discription:{
        type:String,
        required:[true,"please enter book discription"],
        maxLength:[500,'discription  cannot exceed 200 charecter']
    },
    stock:{
        type:Number,
        required:[true,"please enter book quantity"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const schema = mongoose.model("book",bookSchema)
module.exports =schema