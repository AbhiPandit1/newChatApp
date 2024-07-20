import express from 'express';

import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/userController.js';

const router = express.Router();

//User Routes
router.get('/', protectRoute, getUsersForSidebar);
router.get('/:id');
router.post('/logout');

export default router;
