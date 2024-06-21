import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import usersRoutes from './routes/api/usersRoutes.js';
import listingsRoutes from './routes/api/listingsRoutes.js';
import appointmentRoutes from './routes/api/appointmentRoutes.js';
import adminRoutes from './routes/api/adminRoutes.js';

const app = express();

const database = process.env.DATABASE_URI;
const PORT = process.env.PORT || 3500;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
};

// Middlewares
app.use(cookieParser()); 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRoutes);
app.use('/listings', listingsRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/admin', adminRoutes);
 
app.listen(PORT, async () => {
    await mongoose.connect(database)
        .then(() => console.log(`database connected successfully\n Server running on port ${PORT}`))
        .catch((err) => console.log(`database connectivity failed: ${err.message}`));
});
