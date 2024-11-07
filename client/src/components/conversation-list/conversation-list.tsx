import { FC, useState } from "react";

interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
}

const initialConversations: Conversation[] = [
    {
        id: "1",
        name: "Assistance Projet",
        lastMessage: "Comment puis-je vous aider à améliorer votre projet ?",
    },
    {
        id: "2",
        name: "Planification",
        lastMessage:
            "Souhaitez-vous discuter des prochaines étapes pour votre projet ?",
    },
    {
        id: "3",
        name: "Développement Web",
        lastMessage:
            "Les meilleures pratiques pour structurer une application moderne.",
    },
    {
        id: "4",
        name: "Questions Techniques",
        lastMessage:
            "Comprendre les concepts clés de la programmation asynchrone.",
    },
    {
        id: "5",
        name: "Productivité",
        lastMessage:
            "Comment organiser votre emploi du temps pour être plus productif ?",
    },
    {
        id: "6",
        name: "Aide à l’Étude",
        lastMessage:
            "Révision des concepts essentiels pour l’examen de demain.",
    },
];

const ConversationList: FC = () => {
    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);

    const handleDelete = (id: string) => {
        setConversations((prevConversations) =>
            prevConversations.filter((conversation) => conversation.id !== id)
        );
    };

    return (
        <div className="w-3/12 bg-gray-100 border overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Conversations</span>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <span>+</span>
                </div>
            </div>

            <ul>
                {conversations
                    .slice() // Créer une copie pour éviter de modifier l'état directement
                    .sort((a, b) => parseInt(b.id) - parseInt(a.id)) // Trier par id décroissant
                    .map((conversation) => (
                        <li
                            key={conversation.id}
                            className="p-4 cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                        >
                            <div>
                                <div className="font-semibold flex justify-between">
                                    {conversation.name || "... "}
                                    <button
                                        onClick={() =>
                                            handleDelete(conversation.id)
                                        }
                                        className="text-red-500 hover:text-red-700 font-light"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {conversation.lastMessage}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

ConversationList.displayName = "ConversationList";

export { ConversationList };
