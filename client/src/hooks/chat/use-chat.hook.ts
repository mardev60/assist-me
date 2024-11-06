import { Message } from "@/types";
import axios from "axios";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../env/variables";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Récupérer le token du localStorage
    const token = localStorage.getItem("access_token");

    // Créer une instance Axios avec le token dans les en-têtes
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,  // Inclure le token dans l'en-tête Authorization
        },
    });

    // Fonction pour envoyer un message
    const handleSend = async () => {
        setIsLoading(true);
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: uuidv4(), text: input, fromMe: true },
            ]);
            setInput("");
        }

        try {
            const claudeResponse = await axiosInstance.post(`${API.URL}/chat`, {
                message: input,
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: uuidv4(),
                    text: claudeResponse.data.message.text,
                    fromMe: false,
                },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
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
        isLoading,
        handleKeyDown,
    };
};

useChat.displayName = "useChat";

export { useChat };