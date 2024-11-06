import { Router } from "express";
import {
    loginController,
    meController,
    registerController,
} from "../auth/authController";
import { authenticateToken } from "../auth/authMiddleware";
import { sendMessageController } from "../chat/chatController";
import { getMessagesController } from "../chat/claudeService";
import { authorizeRole } from "../auth/authorizeRole";

const router = Router();

// Routes d'authentification
router.post("/login", loginController, authorizeRole(1));
router.post("/register", registerController, authorizeRole(1));
router.get("/me", authenticateToken, meController, authorizeRole(1));

// Routes de chat
router.post("/chat", sendMessageController, authorizeRole(1));
router.get("/chat/messages", getMessagesController , authorizeRole(1));

export default router;
