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
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authenticateToken, meController, authorizeRole(1));

// Routes de chat
router.post("/chat", authenticateToken, authorizeRole(1), sendMessageController);
router.get("/chat/messages", authenticateToken, authorizeRole(1), getMessagesController);


export default router;
