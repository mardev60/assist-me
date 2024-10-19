import { Anthropic } from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../auth/models/messageModel";
dotenv.config({ path: "./.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const messagesFilePath = path.join(__dirname, "./messages.json");

if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
        "Erreur : La clé d'API Anthropic n'est pas définie dans le fichier .env"
    );
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export const sendMessageToClaude = async (message: string): Promise<any> => {
    try {
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 100,
            messages: [{ role: "user", content: message }],
        });

        return response;
    } catch (error) {
        console.error(
            "Erreur lors de la communication avec l'API Claude:",
            error
        );
        throw new Error("Erreur lors de la communication avec l'API Claude");
    }
};

export const readMessagesFromFile = (): Message[] => {
    try {
        const data = fs.readFileSync(messagesFilePath, "utf-8");
        return JSON.parse(data) || [];
    } catch (error) {
        console.error(
            "Erreur lors du parsing du fichier messages.json:",
            error
        );
        return [];
    }
};

const saveMessagesToFile = (messages: Message[]): void => {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export const registerMessage = async (
    message: string,
    fromMe: boolean = true,
    id: string = uuidv4()
): Promise<string> => {
    const messages = readMessagesFromFile();

    saveMessagesToFile([...messages, { id, text: message, fromMe }]);
    return "Message enregistré avec succès";
};

export const getMessagesController = (req: Request, res: Response): void => {
    try {
        const messages = readMessagesFromFile();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to load messages" });
    }
};
