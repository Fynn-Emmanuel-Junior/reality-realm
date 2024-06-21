import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

},{timestamps: true});

const AdminModel = mongoose.model('Admin', adminSchema);
export default AdminModel;