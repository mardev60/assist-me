import { useState } from "react";
import { FC } from "react";
import { useChat } from "../../hooks";
import { InputGroup } from "../input-group";
import { Loader } from "../loader";
import { v4 as uuid } from "uuid";

const ConversationList: FC = () => {
    const [selectedConversationId, setSelectedConversationId] =
        useState<number>(0);

    const {
        messages,
        conversations,
        setInput,
        input,
        handleSend,
        isLoading,
        messagesEndRef,
        handleDelete,
        handleSelectConversation,
        handleCreateConversation,
    } = useChat({ selectedConversationId, setSelectedConversationId });

    const handleKeyDownWithConversationId = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend(selectedConversationId);
        }
    };

    return (
        <div className="flex h-screen overflow-y-scroll rounded shadow-lg">
            <div className="w-1/4 bg-gray-100 shadow-md p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md italic font-extralight text-gray-700">
                        {conversations.length > 0
                            ? conversations.length
                            : "Aucune "}{" "}
                        conversation
                        {conversations.length > 1 ? "s" : ""}
                    </h2>
                    <span
                        className="w-8 h-8 bg-green-500 text-white bold text-2xl rounded-lg flex items-center justify-center hover:cursor-pointer hover:bg-green-600"
                        onClick={handleCreateConversation}
                    >
                        +
                    </span>
                </div>

                <ul>
                    {conversations
                        .slice()
                        .sort((a, b) => parseInt(b.id) - parseInt(a.id))
                        .map((conversation) => (
                            <div
                                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-all"
                                key={conversation.id} // Assurez-vous que cette ligne est présente
                            >
                                <li
                                    className={`p-4 rounded-lg cursor-pointer flex-grow flex items-center justify-between transition-colors ${
                                        selectedConversationId ===
                                        Number(conversation.id)
                                            ? "bg-blue-100 border-blue-500 border-l-4"
                                            : "bg-blue-100 border-blue-100 border-l-4 hover:border-blue-300"
                                    }`}
                                    onClick={() =>
                                        handleSelectConversation(
                                            Number(conversation.id)
                                        )
                                    }
                                >
                                    <p className="font-semibold text-gray-800">
                                        {conversation.title
                                            ? conversation.title.length > 20
                                                ? conversation.title.substring(
                                                      0,
                                                      15
                                                  ) + "..."
                                                : conversation.title
                                            : "Conversation"}
                                    </p>
                                </li>
                                <div
                                    onClick={() =>
                                        handleDelete(Number(conversation.id))
                                    }
                                    className="text-red-500 hover:text-white bg-red-200 hover:bg-red-500 ml-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out p-4"
                                    title="Supprimer la conversation"
                                >
                                    ✕
                                </div>
                            </div>
                        ))}
                </ul>
            </div>

            {/* Message display area */}
            <div className="flex-1 bg-gray-50 p-6 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {selectedConversationId ? (
                        messages
                            .filter(
                                (msg) =>
                                    msg.conversationId ===
                                    selectedConversationId
                            )
                            .map((message) => (
                                <div
                                    key={uuid()} // Gardez cette clé ici
                                    className={`mb-4 ${
                                        message.fromUser
                                            ? "text-right"
                                            : "text-left"
                                    }`}
                                >
                                    <div
                                        className={`inline-block py-3 px-5 rounded-lg ${
                                            message.fromUser
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        {message.message}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="font-bold animate-pulse h-full flex items-center justify-center">
                            <span className="block font-mono text-2xl text-gray-800 border-r-4 border-gray-800 overflow-hidden animate-typing">
                                Comment puis-je vous aider ?
                            </span>
                        </div>
                    )}
                    {isLoading && <Loader />}
                    <div ref={messagesEndRef} />
                </div>

                <InputGroup
                    setInput={setInput}
                    handleKeyDown={handleKeyDownWithConversationId}
                    input={input}
                    handleSend={() => handleSend(selectedConversationId)}
                />
            </div>
        </div>
    );
};

ConversationList.displayName = "ConversationList";

export { ConversationList };
