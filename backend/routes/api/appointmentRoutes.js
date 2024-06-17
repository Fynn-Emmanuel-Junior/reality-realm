import express from 'express'
import { bookAppointment } from '../../controllers/appointmentController'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/appointment',authMiddleware,bookAppointment);