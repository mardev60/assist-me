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
    return response.data;
};

export const saveMessage = async (
    message: string,
    userId: number,
    fromUser: boolean
): Promise<string> => {
    await prisma.messages.create({
        data: {
            message: message,
            userId: userId,
            fromUser: fromUser,
        },
    });

    return "Message sent";
};
