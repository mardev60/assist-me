import { Message } from "@/types";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../config/axiosConfig";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async () => {
        setIsLoading(true);
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: uuidv4(), message: input, fromUser: true },
            ]);
            setInput("");
        }

        const claudeResponse = await axiosInstance.post(`/chat`, {
            message: input,
        });

        if (claudeResponse) {
            setIsLoading(false);
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: uuidv4(),
                message: claudeResponse.data.message.text,
                fromUser: false,
            },
        ]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Empêche un retour à la ligne
            handleSend(); // Appelle la fonction pour envoyer le message
        }
    };

    // useEffect pour récupérer les messages lors du montage du composant
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.get<Message[]>(
                    `/chat/messages`
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        };

        fetchMessages();
    }, []);

    // useEffect pour faire défiler les messages vers le bas à chaque mise à jour
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return {
        messages,
        input,
        setInput,
        handleSend,
        messagesEndRef,
        isLoading,
        handleKeyDown,
    };
};

useChat.displayName = "useChat";

export { useChat };
