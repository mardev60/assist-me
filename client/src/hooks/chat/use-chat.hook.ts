import { Conversation, Message } from "../../types";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

interface UseChatProps {
    selectedConversationId: number;
    setSelectedConversationId: (id: number) => void;
}

const useChat = (props: UseChatProps) => {
    const { selectedConversationId, setSelectedConversationId } = props;
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async (convId: number) => {
        if (input.trim()) {
            await sendMessage(input, convId);
            setInput("");
        }
    };

    const handleDelete = async (conversationId: number) => {
        try {
            await axiosInstance.post("/chat/delete", {
                conversationId: conversationId,
            });
            setConversations((prev) =>
                prev.filter((conv) => Number(conv.id) !== conversationId)
            );
            if (conversationId === selectedConversationId) {
                setSelectedConversationId(0);
            }
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de la conversation",
                error
            );
        }
    };

    const sendMessage = async (message: string, convId: number) => {
        addUserMessage(message);

        if (convId === 0) {
            await createConversation(message);
        } else {
            await sendToClaude(message, convId);
        }
    };

    const addUserMessage = (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                message,
                fromUser: true,
                conversationId: selectedConversationId,
            },
        ]);
        setIsLoading(true);
    };

    const createConversation = async (conversationName: string) => {
        try {
            const response = await axiosInstance.post("/chat/create", {
                conversationName,
            });
            const newConversationId = response.data.conversationId;
            await sendToClaude(conversationName, newConversationId);
            setSelectedConversationId(newConversationId);
        } catch (error) {
            console.error(
                "Erreur lors de la création de la conversation",
                error
            );
        }
    };

    const sendToClaude = async (message: string, conversationId: number) => {
        try {
            const response = await axiosInstance.post(`/chat`, {
                message,
                conversationId,
            });
            addClaudeMessage(response.data.message.text);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message", error);
        }
    };

    const addClaudeMessage = (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                message,
                fromUser: false,
                conversationId: selectedConversationId,
            },
        ]);
        setIsLoading(false);
    };

    const fetchMessagesForConversation = async (conversationId: number) => {
        try {
            const response = await axiosInstance.get<Message[]>(
                `/chat/messages?conversationId=${conversationId}`
            );
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to load messages:", error);
        }
    };

    // Charger les messages chaque fois que selectedConversationId change
    useEffect(() => {
        if (selectedConversationId) {
            fetchMessagesForConversation(selectedConversationId);
        }
    }, [selectedConversationId]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axiosInstance.get<Conversation[]>(
                    "/chat/conversation-list"
                );
                setConversations(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des conversations",
                    error
                );
            }
        };

        fetchConversations();
    }, [selectedConversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return {
        messages,
        conversations,
        input,
        setInput,
        handleSend,
        handleDelete,
        messagesEndRef,
        isLoading,
        handleSelectConversation: setSelectedConversationId,
        handleCreateConversation: () => setSelectedConversationId(0),
    };
};

useChat.displayName = "useChat";

export { useChat };
