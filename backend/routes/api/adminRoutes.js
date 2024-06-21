import express from 'express';
import {
    createAdminController
} from '../../controllers/adminController.js';

const router = express.Router();

router.post('/create', createAdminController);


export default router;