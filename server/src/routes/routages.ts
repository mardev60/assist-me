// routes/routes.js
import { Router } from "express";
import {
    loginController,
    meController,
    registerController,
} from "../auth/authController";
import { authenticateToken } from "../auth/authMiddleware";
import { sendMessageController } from "../chat/chatController";
import { getMessagesController } from "../chat/claudeService";
import { helloWorldController } from "../helloWorld/helloWorldController";

const router = Router();

// Route GET /hello
router.get("/hello", helloWorldController);

// Routes d'authentification
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authenticateToken, meController);

// Routes de chat
router.post("/chat", sendMessageController);
router.get("/chat/messages", getMessagesController);

export default router;
