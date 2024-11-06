import { Request, Response } from "express";
import { registerMessage } from "../chat/claudeService";
import { sendMessageToClaude } from "./claudeService";
import { sendMessageToAi } from "./chatService";

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
        const response = await sendMessageToAi(message);
        const messageResponse = response.choices[0].message.content;
        console.log(messageResponse);
        // const claudeResponse = await sendMessageToClaude(message);
        // const claudeMessage = claudeResponse.content[0].text;
        // await registerMessage(message);
        // await registerMessage(claudeMessage, false);
        res.status(201).json({ message : {text : messageResponse} });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
