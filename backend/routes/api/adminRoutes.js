import express from 'express';
import {
    createAdminController,
    loginAdminController
} from '../../controllers/adminController.js';

const router = express.Router();

router.post('/create', createAdminController);
router.post('/login', loginAdminController);


export default router;