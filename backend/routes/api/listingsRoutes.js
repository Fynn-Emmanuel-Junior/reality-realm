import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import {
    createListings,
    getAllListings,
} from '../../controllers/listingsController.js'

const router = express.Router()

router.get('/get/:id',authMiddleware,getAllListings)
router.post('/create',authMiddleware,createListings)
export default router