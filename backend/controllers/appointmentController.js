import nodemailer from 'nodemailer';
import AppointmentModel from '../models/AppointmentModel.js';

export const bookAppointment = async (req, res) => {
    try {
        const { appointmentDate,email,id } = req.body;

        if (!appointmentDate) {
            return res.status(400).json({ message: 'Appointment date is required' });
        }

        // Save the appointment details to the database
          const newAppointment = await AppointmentModel.create({
            userEmail: email,
            appointmentDate, 
            userId: id
        }); 
        console.log(newAppointment);

        // Send confirmation email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fynn.emmanuel100@gmail.com',
                pass: 'Emoji@500'
            }
        });

        const mailOptions = {
            from: 'fynn.emmanuel100@gmail.com',
            to: userEmail,
            subject: 'Appointment Confirmation',
            text: `Your appointment is confirmed for ${appointmentDate}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            statusCode : 200,
            message: 'Appointment booked and confirmation email sent' 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getNotificationsByUser = async(req,res) => {
    try {

    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

