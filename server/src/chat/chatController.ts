import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { saveMessage, sendMessageToAi } from "./chatService";
const prisma = new PrismaClient();

export const sendMessageController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { message, conversationId } = req.body;

    const token = req.cookies?.token;
    const decodedToken: { id: number } = jwtDecode(token);
    const userId = decodedToken.id;

    if (!message || !conversationId) {
        res.status(400).json({ error: "Message is required" });
        return;
    }

    try {
        const response = await sendMessageToAi(message);

        const messageResponse = response.claudeResponse;
        const conversationTitle = response.conversationTitle;

        await saveMessage(message, userId, true, conversationId);
        await saveMessage(messageResponse, userId, false, conversationId);

        res.status(201).json({
            message: {
                text: messageResponse,
                conversationTitle: conversationTitle,
                test: "test",
            },
        });

        // const claudeResponse = await sendMessageToClaude(message);
        // const claudeMessage = claudeResponse.content[0].text;
        // await registerMessage(message);
        // await registerMessage(claudeMessage, false);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getMessagesController = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;
        const userId = token.id;

        res.status(201).json(
            await prisma.messages.findMany({
                where: {
                    userId,
                },
            })
        );
    } catch (error) {
        console.error("Error retrieving messages:", error);
        throw new Error("Failed to retrieve messages");
    }
};
