import { Message } from "@/types";
import { useEffect, useRef, useState } from "react";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Bonjour! Comment puis-je vous aider aujourd'hui?",
            fromUser: false,
        },
        {
            id: 2,
            text: "Pouvez-vous m'aider avec la programmation?",
            fromUser: true,
        },
        { id: 3, text: "Bien sûr! Que voulez-vous savoir?", fromUser: false },
        { id: 4, text: "Comment créer un composant React?", fromUser: true },
        {
            id: 5,
            text: "Vous pouvez utiliser la fonction useState pour cela.",
            fromUser: false,
        },
        { id: 6, text: "Merci! Et pour les hooks?", fromUser: true },
        {
            id: 7,
            text: "Les hooks sont des fonctions qui vous permettent d'utiliser l'état et d'autres fonctionnalités de React.",
            fromUser: false,
        },
        { id: 8, text: "Pouvez-vous donner un exemple?", fromUser: true },
        { id: 9, text: "Bien sûr! Voici un exemple simple.", fromUser: false },
        { id: 10, text: "Merci beaucoup!", fromUser: true },
        {
            id: 11,
            text: "De rien! Avez-vous d'autres questions?",
            fromUser: false,
        },
        { id: 12, text: "Non, c'est tout pour le moment.", fromUser: true },
        {
            id: 13,
            text: "Très bien, passez une bonne journée!",
            fromUser: false,
        },
        { id: 14, text: "Merci, vous aussi!", fromUser: true },
        { id: 15, text: "Au revoir!", fromUser: false },
        { id: 16, text: "Au revoir!", fromUser: true },
        {
            id: 17,
            text: "Je suis toujours là si vous avez besoin de moi.",
            fromUser: false,
        },
        { id: 18, text: "D'accord, merci!", fromUser: true },
        { id: 19, text: "N'hésitez pas à revenir.", fromUser: false },
        { id: 20, text: "Je le ferai. Merci encore!", fromUser: true },
    ]);

    const [input, setInput] = useState<string>("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        console.log("jey");

        if (input.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, text: input, fromUser: true },
            ]);
            setInput("");
        }
    };

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
