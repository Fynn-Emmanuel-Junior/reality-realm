import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
    }
},{timestamps: true})

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default AppointmentModel;