

export const generateTokenAndSendCookie = (user, message, statusCode, res)=>{
    const token = user.generateJsonWebToken();

    // cookie name according to user role
    const cookieName = user.role === "Admin" ? "adminToken":"patientToken";

    res.status(statusCode).cookie(cookieName, token,{ 
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json({
        success:true,
        message: message,
        user,
        token
    })
}