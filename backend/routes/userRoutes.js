import { Router } from 'express';
const router = Router();
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:userId', getUserProfile);

export default router;
