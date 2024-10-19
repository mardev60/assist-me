import { Message } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../env/variables";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Fonction pour envoyer un message
    const handleSend = async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: uuidv4(), text: input, fromMe: true },
            ]);
            setInput("");
        }

        const claudeResponse = await axios.post(`${API.URL}/chat`, {
            message: input,
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: uuidv4(),
                text: claudeResponse.data.claudeMessage,
                fromMe: false,
            },
        ]);
    };

    // useEffect pour récupérer les messages lors du montage du composant
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<Message[]>(
                    `${API.URL}/chat/messages`
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
    };
};

useChat.displayName = "useChat";

export { useChat };
