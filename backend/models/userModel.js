const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        required:[true,'please enter name'],
        type:String,
        trim:true
    },
    email:{
        required:[true,'please enter email'],
        type:String,
        validate:[validator.isEmail,"please valid email address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        select:true
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

userSchema.pre('save' , async function (next){
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function (enteredpass){
    return await bcrypt.compare(enteredpass,this.password)
}

const schema = mongoose.model("user",userSchema)
module.exports = schema
