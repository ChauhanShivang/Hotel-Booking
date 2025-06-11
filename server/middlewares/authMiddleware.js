import User from "../models/User.js"

// Middleware to check if the user is authrnticated
export const protect = async(req, res, next) => {
    const {userId} = await req.auth()
    if(!userId){
        res.json({success: false, message: "Not Authorized"})
    }
    else{
        const user = await User.findById(userId)
        req.user = user
        next()
    }
}