// routes/routes.js
import { Router } from 'express';
import { helloWorldController } from '../helloWorld/helloWorldController';
import { chatController } from '../chat/chatController';
import { loginController, registerController, meController } from '../auth/authController';
import { authenticateToken } from '../auth/authMiddleware';

const router = Router();

// Route GET /hello
router.get('/hello', helloWorldController);

// Routes d'authentification
router.post('/login', loginController);
router.post('/register', registerController);
router.get('/me', authenticateToken, meController);
router.post('/chat', chatController);

export default router;
