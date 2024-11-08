import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createConversation, deleteConversation } from "./conversationService";
const prisma = new PrismaClient();

export const createConversationController = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const name = req.body.conversationName;
        const userId = req.user?.id;

        if (!userId) return res.status(400).json({ error: "User not found" });

        const conversationId = await createConversation(name, userId);
        return res.status(201).json({ conversationId: conversationId });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getConversationsController = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        res.status(201).json(
            await prisma.conversations.findMany({
                where: {
                    userId,
                },
                include: {
                    messages: true,
                },
            })
        );
    } catch (error) {
        console.error("Error retrieving messages:", error);
        throw new Error("Failed to retrieve messages");
    }
};

export const getConversationChatController = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        res.status(201).json(
            await prisma.conversations.findUnique({
                where: {
                    userId,
                    id: Number(req.params.id),
                },
                include: {
                    messages: true,
                },
            })
        );
    } catch (error) {
        console.error("Error retrieving messages:", error);
        throw new Error("Failed to retrieve messages");
    }
};

export const deleteConversationController = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const conversationId = req.body.conversationId;
        const userId = req.user?.id;

        if (!userId || !conversationId)
            return res
                .status(400)
                .json({ error: "User or conversation not found" });

        const response = await deleteConversation(conversationId, userId);
        return res.status(201).json({ response: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
