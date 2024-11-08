export interface Message {
    id?: number;
    message: string;
    fromUser: boolean;
    conversationId?: number;
}
