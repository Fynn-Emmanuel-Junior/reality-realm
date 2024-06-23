import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';

const authMiddleware = asyncHandler(async (req, res, next) => {
   const authHeader = req.headers.authorizationHeader || req.headers.Authorization;

   if(!authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Unauthorized'});

   const token = authHeader.split(' ')[1];

   jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,decoded) => {
        if(err) return res.status(403).json({message: 'Forbidden'});
        req.user = decoded.userId;

        next();
    }
   )
});

export { authMiddleware };
