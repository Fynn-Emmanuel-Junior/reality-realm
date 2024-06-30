import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true, 
    },
    AdminKey: {
        type: String,
        required: true,
    }
},{timestamps: true});

const AdminModel = mongoose.model('Admin', adminSchema);
export default AdminModel;