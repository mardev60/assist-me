import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const sendMessageToAi = async (message: string): Promise<any> => {
    let body = {
        model: "llama3-8b-8192",
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    };
    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        body,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer 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",
            },
        }
    );

    const claudeResponse = response.data.choices[0].message.content;
    const askTitleSentence = `Can you generate a title for this conversation ? "${claudeResponse}" with 20 characters max`;

    let titleBody = {
        model: "llama3-8b-8192",
        messages: [
            {
                role: "user",
                content: askTitleSentence,
            },
        ],
    };
    const conversationTitleRequest = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        titleBody,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer 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",
            },
        }
    );

    const conversationTitle =
        conversationTitleRequest.data.choices[0].message.content;

    return { claudeResponse, conversationTitle };
};

export const saveMessage = async (
    message: string,
    userId: number,
    fromUser: boolean,
    conversationId: number
): Promise<string> => {
    await prisma.messages.create({
        data: {
            message: message,
            userId: userId,
            fromUser: fromUser,
            conversationId: conversationId,
        },
    });

    return "Message sent";
};
