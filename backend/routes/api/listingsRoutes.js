import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import {
    createListings
} from '../../controllers/listingsController.js'

const router = express.Router()

router.post('/create',authMiddleware,createListings)
export default router