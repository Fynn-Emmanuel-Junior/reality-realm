import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const register = async (req,res) => {
    const { username, email , password } = req.body

    const CheckIfEmailExists = await UserModel.findOne({email})
    if(CheckIfEmailExists) return res.status(409).json({message: "User already exists"})

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)


    try {
            const user = await UserModel.create({
                username,
                email,
                password: hashedPassword
            })
        
            console.log('user created suucessfully')

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            })
            
        } catch(error) {
            res.status(401).json({message: error.message})
        }
}


const auth = async (req,res) => {
    const { email, password } = req.body

    const foundUser = await UserModel.findOne({email})

    if(!foundUser) return res.status(404).json({message: 'user not found'})
    
    const match = await bcrypt.compare(password,foundUser.password)

   if(match) {
        
    const accessToken = jwt.sign(
        { "userId": foundUser._id },
        process.env.ACCESS_TOKEN_SECRET,

    )

    // Save token in a cookie

    res.cookie(
        'jwt',
        accessToken,
        {
            httpOnly: true , 
            sameSite: "None", 
            secure: true ,
        }
    )

    res.status(200).json({
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
    })
   
   } else {
        res.status(401).json({message: ' Unauthorized user'})
   }
    
}


const google = async (req,res) => { 
    try {
        const user = await UserModel.findOne({email: req.body.email})
        
        if(user) {
            const accesstoken = jwt.sign(
                {"userId": user._id},
                process.env.ACCESS_TOKEN_SECRET,
            )
    
            const { password: pass , ...rest } = user._doc
    
            res.cookie(
                'jwt',
                accesstoken,
                {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                }
            )

            res.status(200).json(rest)
            
        } else {

            const generatedPassword = Math.random().toString(36).slice(-8)

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(generatedPassword,salt)

            const newUser = await UserModel.create({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            })

            const accesstoken = jwt.sign(
                {"userId": newUser._id},
                process.env.ACCESS_TOKEN_SECRET,
            )

            const { password: pass , ...rest } = newUser._doc
    
            res.cookie(
                'jwt',
                accesstoken,
                {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                }
            )

            res.status(200).json(rest)
        }

    } catch (err) {
        res.status(401).json({message: 'could not sign in using google'})
    }
}

const update = async (req,res) => {
    try {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }

        const user =  await UserModel.findByIdAndUpdate(req.user._id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
    
            }
        }, {new: true})

        const {password:pass, ...rest} = user._doc
    
        res.status(200).json(rest)
    
    } catch(err) {
        res.status(400).json({message: err.message})
    }    
}

const deleteUser = async (req,res) => {

    if(req.user) {
        try {
            const deleteuser = await UserModel.findByIdAndDelete(req.user._id)
            res.clearCookie('jwt')
            res.status(200).json(deleteuser)
            console.log('user deleted')
        } catch(err) {
            res.status(400).json({message: err.message})
        }

    } else {
        res.status(404).json({message: 'user not found'})
    }
}

const signout = async (req,res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({message: 'user has been logout'})
    } catch(err) {
        res.status(401).json({message: 'error in logging out user'})
    }
}


export {
    register,
    auth,
    google,
    update,
    deleteUser,
    signout
}