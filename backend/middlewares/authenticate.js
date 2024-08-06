const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

exports.isAuthenticateduser = async (req,res,next) =>{
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            success:false,
            message:"login to access this source"
        })
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.id = decode.id
    user = await User.findById(decode.id)
    if (!user) {
        return res.status(401).json({
            success:false,
            message:"Your account has suspended"
        })
    }
    else{req.user = await User.findById(decode.id)}
    
    next()
}

exports.authorizedRole = (...roles)=> {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                success:false,
                message:`Role ${req.user.role} is not allowed`
            })
        }
        next()
    }
}

