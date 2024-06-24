import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import asyncHandler from "express-async-handler";

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) return res.status(404).json({ message: 'Email is not valid' });
    if (!validator.isStrongPassword(password)) return res.status(404).json({ message: 'Password is not strong enough' });

    const CheckIfEmailExists = await UserModel.findOne({ email });
    if (CheckIfEmailExists) return res.status(409).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            statusCode: 201
        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const auth = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) return res.status(404).json({ message: 'user not found' });

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const accessToken = jwt.sign(
            { "userId": foundUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15minutes'
            }
        );

        const refreshToken = jwt.sign(
            { "userId": foundUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '2d',
            },
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: false,
            maxAge: 3*24*60*60*1000
        });

        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            AccessToken: accessToken
        });

    } else {
        res.status(401).json({ message: 'Unauthorized user' });
    }
};

const refresh = async(req,res) => {
    const cookies = req.cookies;

    if(!cookies.jwt) return res.status(401).json({message: 'Forbidden'});

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err,decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'});

            const foundUser = await UserModel.findById(decoded.userId);
            if(!foundUser) return res.status(401).json({message: 'Unauthorized user'});

            const accessToken = jwt.sign(
                {"userId": foundUser._id},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15minutes'}
            )

            res.json({AccessToken: accessToken});
        })
    );
};

const google = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (user) {
            const accesstoken = jwt.sign(
                { "userId": user._id },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15minutes'}
            );

            const refreshToken = jwt.sign(
                { "userId": foundUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '2d',
                },
            );

            const { password: pass, ...rest } = user._doc;

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: false
            });

            res.json({AccessToken: accesstoken})
            res.status(200).json(rest);

        } else {

            const generatedPassword = Math.random().toString(36).slice(-8);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);

            const newUser = await UserModel.create({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });

            const accesstoken = jwt.sign(
                { "userId": newUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15minutes'}
            );

            const refreshToken = jwt.sign(
                { "userId": foundUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '2d',
                },
            )

            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    sameSite: "None",
                    secure: false,
                }
            );

            res.json({AccessToken: accesstoken});

            const { password: pass, ...rest } = newUser._doc;
            res.status(200).json(rest);
        }

    } catch (err) {
        res.status(401).json({ message: 'could not sign in using google' });
    }
};

const update = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await UserModel.findByIdAndUpdate(req.user,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        },{ new: true });

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    if (req.user) {
        try {
            const deleteuser = await UserModel.findByIdAndDelete(req.user._id);
            res.status(200).json(deleteuser);
    
        } catch (err) {
            res.status(400).json({ message: err.message });
        }

    } else {
        res.status(404).json({ message: 'user not found' });
    }
};

const signout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(204);
  
    res.clearCookie('jwt',{
        httpOnly: true,
        sameSite: 'None',
        secure: false
    });
    res.status(200).json({ message: 'user has been logout' });
}; 

const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(204).json({ message: 'No user found' });

        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (err) {
        res.status(400).json({ message: 'Failed to get user' });
    }
};

const sendOtpController = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate 4-digit OTP
        const otp = crypto.randomInt(1000, 9999).toString();

        // Hash the OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        // Store hashed OTP and expiration time in the user document
        user.otp = hashedOtp;
        user.otpExpires = Date.now() + 1 * 60 * 1000; // OTP valid for 1 minute
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 1 minute.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(500).json({ message: `Error sending OTP: ${err.message}` });
    }
};

const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if OTP is expired
        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Verify OTP
        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });

        // Generate JWT tokens
        const accessToken = jwt.sign(
            { "userId": user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { "userId": user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '2d' }
        );

        // Clear OTP fields in the user document
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Set cookies for the tokens

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV !== 'development',
        });

        res.json(accessToken);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        res.status(500).json({ message: `Error verifying OTP: ${err.message}` });
    }
};

export {
    register,
    auth,
    google,
    update,
    deleteUser,
    signout,
    getUser,
    sendOtpController,
    verifyOtpController,
    refresh
};
