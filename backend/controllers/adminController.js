import adminModel from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import validator from 'validator'

export const createAdminController = async(req,res) => {
    const { adminName, email, password,adminkey } = req.body
    if(!validator.isEmail(email)) return res.status(404).json({message: 'Email is not valid'});
    if(!validator.isStrongPassword(password)) return res.status(404).json({message: 'Password is not strong enough'});
    const CheckIfEmailExists = await adminModel.findOne({email})
    if(CheckIfEmailExists) return res.status(409).json({message: "Admin already exists"})
        
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    try {
        const admin = await adminModel.create({
            adminName,
            email,
            password:  hashedPassword,
            AdminKey: adminkey
        })
        
        const {_id, ...rest} = admin
        res.status(201).json({
            statusCode: 201,
            message: 'Admin created',
            adminId: _id
        });
    }catch(err) {
        res.status(400).json({message: `cannot create admin: ${err.message}`})
    }

}