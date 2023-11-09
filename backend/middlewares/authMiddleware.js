import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import asyncHandler from 'express-async-handler';

const authMiddleware = asyncHandler(async (req,res,next) => {
    let token;

    token = req.cookies.jwt
  
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            req.user = await UserModel.findById(decoded.userId)
            console.log(req.user)
            
            next()

        } catch(err) {
            res.status(401).json({message: "Invalid token"})
        }
    } else {
        res.status(403).json({message: 'No token found'})
    }

})

export { 
    authMiddleware
}