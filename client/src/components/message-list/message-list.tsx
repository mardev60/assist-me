import { Message } from "@/types";
import { FC, MutableRefObject } from "react";
import { Loader } from "../loader/loader";

interface MessageListProps {
    messages: Message[];
    messagesEndRef: MutableRefObject<HTMLDivElement | null>;
    isLoading: boolean;
}

const MessageList: FC<MessageListProps> = (props) => {
    const { messages, messagesEndRef, isLoading } = props;

    return (
        <div className="flex-1 overflow-y-auto p-10 border border-gray-300">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 animate-pulse font-bold text-2xl">
                    Discutez avec Assist-Me
                </div>
            )}

            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-2 ${
                        message.fromUser ? "text-right" : "text-left"
                    }`}
                >
                    <div
                        className={`inline-block py-2 px-4 rounded-lg max-w-xl ${
                            message.fromUser
                                ? "bg-blue-500 text-white text-left"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {message.message}
                    </div>
                </div>
            ))}

            {isLoading && (
                <div className="text-center my-2">
                    <Loader />
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};

MessageList.displayName = "MessageList";

export { MessageList };
