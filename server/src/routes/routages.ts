import { Router } from "express";
import {
    loginController,
    logoutController,
    meController,
    registerController,
} from "../auth/authController";
import { authenticateToken } from "../auth/authMiddleware";
import { authorizeRole } from "../auth/authorizeRole";
import {
    getMessagesController,
    sendMessageController,
} from "../chat/chatController";
import {
    createConversationController,
    getConversationsController,
    getConversationChatController,
    deleteConversationController,
} from "../conversation/conversationController";

const router = Router();

// Auth
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authenticateToken, meController, authorizeRole(1));
router.post("/logout", logoutController);

// Chat
router.post(
    "/chat",
    authenticateToken,
    authorizeRole(1),
    sendMessageController
);

router.get(
    "/chat/messages",
    authenticateToken,
    authorizeRole(1),
    getMessagesController
);

// Conversations
router.post(
    "/chat/create",
    authenticateToken,
    authorizeRole(1),
    createConversationController
);

router.get(
    "/chat/conversation-list",
    authenticateToken,
    authorizeRole(1),
    getConversationsController
);

router.get(
    "/chat/conversation/:id",
    authenticateToken,
    authorizeRole(1),
    getConversationChatController
);

router.post(
    "/chat/delete",
    authenticateToken,
    authorizeRole(1),
    deleteConversationController
);

export default router;
