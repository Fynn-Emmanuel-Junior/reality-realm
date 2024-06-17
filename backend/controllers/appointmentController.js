const nodemailer = require('nodemailer');
import AppointmentModel from '../models/AppointmentModel';

export const bookAppointment = async (req, res) => {
    try {
        const { appointmentDate } = req.body;
        const userEmail = req.user.email;

        if (!appointmentDate) {
            return res.status(400).json({ message: 'Appointment date is required' });
        }

        // Save the appointment details to the database
          const newAppointment = new AppointmentModel({
            userEmail,
            appointmentDate,
        });

        await newAppointment.save();

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

        res.status(200).json({ message: 'Appointment booked and confirmation email sent' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

