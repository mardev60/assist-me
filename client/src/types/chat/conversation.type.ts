import { Message } from "./message.type";

export interface Conversation {
    id: string;
    title: string;
    lastMessage: string;
    messages: Message[];
}
