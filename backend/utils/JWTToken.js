const sendToken = (user,status,res) => {
    
    // Creating Token
    const token = user.getJwtToken()

    //Cookie Option
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME *24*60*60*1000),
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:24*60*60*1000
    }
    
    //Send Responce
    res.status(status)
    .cookie('token',token ,options)
    .json({
        success:true,
        user
    })
}

module.exports = sendToken
