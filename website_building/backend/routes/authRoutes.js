import express from 'express';
import { loginUser, registerUser, toggleAvailability, completeOnboarding } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/toggle-availability', toggleAvailability);
router.post('/complete-onboarding', completeOnboarding);

export default router;
