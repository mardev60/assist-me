// src/controllers/readMessageController.ts

import { Request, Response } from "express";
import { registerMessage } from "../chat/claudeService";
import { sendMessageToClaude } from "./claudeService";

// Contrôleur pour gérer les requêtes de chat
export const sendMessageController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { message } = req.body;

    if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
    }

    try {
        const claudeResponse = await sendMessageToClaude(message);
        const claudeMessage = claudeResponse.content[0].text;
        await registerMessage(message);
        await registerMessage(claudeMessage, false);
        res.status(201).json({ claudeMessage });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
