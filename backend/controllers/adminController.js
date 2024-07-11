import AdminModel from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const createAdminController = async (req, res) => {
    const { adminName, email, password, adminkey } = req.body;

    if(adminkey !== process.env.ADMIN_KEY) return res.status(403).json({message: 'Unauthorized to create admin'});

    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email is not valid' });
    if (!validator.isStrongPassword(password)) return res.status(400).json({ message: 'Password is not strong enough' });

    const CheckIfEmailExists = await AdminModel.findOne({ email });
    if (CheckIfEmailExists) return res.status(409).json({ message: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const admin = await AdminModel.create({
            adminName,
            email,
            password: hashedPassword,
            AdminKey: adminkey
        });

        res.status(201).json({
            statusCode: 201,
            message: 'Admin created',
        });
    } catch (err) {
        res.status(500).json({ message: `Cannot create admin: ${err.message}` });
    }
};

export const loginAdminController = async (req, res) => {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email is not valid' });

    try {
        // Check if the admin exists
        const admin = await AdminModel.findOne({ email }).select('password');
        if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { adminId: admin._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );

        const refreshToken = jwt.sign(
            { adminId: admin._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Set cookies for the tokens
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV !== 'development'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV !== 'development'
        });


        res.status(200).json({
            statusCode: 200,
            message: 'Login successful',
            admin: {admin}
        });
    } catch (err) {
        res.status(500).json({ message: `Cannot login admin: ${err.message}` });
    }
};


