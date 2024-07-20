import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';
const router = express.Router();


//User Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);






export default router;
