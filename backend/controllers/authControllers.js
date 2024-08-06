const User = require('../models/userModel')
const sendToken = require("../utils/JWTToken")
const bcrypt =  require("bcrypt")
const Borrow = require('../models/borrowModel')
const Book = require('../models/bookModel')
const Record = require('../models/recordsModel')


// register user - /api/v2/register POST
exports.registerUser = async(req,res,next)=>{
    const {name, email ,password} = req.body
    
    if(!name || !email || !password){
        return res.status(400).json({
            sucess:false,
            message:"please enter all field"
    })}

    const atEmail = await User.findOne({email})

    if(atEmail){
        return res.status(400).json({
            success:false,
            message:"email already exist"
        })}
    const user = await User.create(req.body)
    sendToken(user,201,res)
}


//login user -/api/v2/loginuser  -POST
exports.loginUser = async (req,res,next )=>{
    let {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            sucess:false,
            message:"please enter email and password"
    })
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({
            sucess:false,
            message:"invalid Credential"
    })}
    if (! await user.isValidPassword(password)) {
        return res.status(401).json({
            sucess:false,
            message:"invalid Credential"
    })}
    
    sendToken(user,201,res)

}

//User name - api/v2/user - GET
exports.userName= async (req,res,next)=>{
    let names = await User.findById(req.id)
    names = req.user.name
    res.status(201).json({
        success:true,
        names
    }) 
}



//logout user - /api/v2/logout  - GET
exports.logOutUser = (req,res,next)=>{
    res.cookie('token',null,
    {
        expires:new Date(Date.now()),
        httpOnly:true,
        sameSite:'none',
        secure:true
    })
    res.status(200).json({
        success:true,
        message:"loggedout"
    })
}

//---------------Admin Controllers-------------//

//Admin Login - /api/v2/adminlogin -POST

exports.adminLogin = async(req,res,next) =>{
    let {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            sucess:false,
            message:"please enter email and password"
    })
    }

    const user = await User.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({
            sucess:false,
            message:"invalid Credential"
    })}
    if(user.role == "user"){
        return res.status(401).json({
            sucess:false,
            message:"role is user"
    })}
    if (!await user.isValidPassword(password)) {
        return res.status(401).json({
            sucess:false,
            message:"invalid Credential"
    })}
    sendToken(user,201,res)
}

// Get All user - /api/v2/getuser - Get

exports.getUser = async(req,res,next)=>{
    const user = await User.find()
    res.status(200).json({
        success:true,
        count:user.length,
        user
    })
}


// Create user - /api/v2/user/add - POST

exports.createUser =  async(req,res,next)=>{
    const user = await User.create(req.body)
    res.status(201).json({
        success:true,
        user
    })
}

// Update User - /api/v2/user/:id -POST

exports.updateUser = async (req,res,next)=>{
    let id = await User.findById(req.params.id)
    if(!id){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }
    
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })
    
    res.status(201).json({
        success:true,
        user
    })
}

// Delete user - /api/v2/user/:id - DELETE

exports.deleteUser = async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

    let borrow = await Borrow.findOne({userId:user.id})
    await Borrow.findByIdAndDelete(borrow.id)
    let book = await Book.findById(borrow.bookId)
    let stock = book.stock + 1
    await Book.findByIdAndUpdate(book.id,{stock:stock})
    await Record.findOneAndUpdate({borrowId:borrow.id},{status:'returned',returnDate:Date.now()})
    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:"user deleted"
    })
}

