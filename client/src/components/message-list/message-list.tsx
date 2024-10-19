import { Message } from "@/types";
import { FC, MutableRefObject } from "react";

interface MessageListProps {
    messages: Message[];
    messagesEndRef: MutableRefObject<HTMLDivElement | null>;
}

const MessageList: FC<MessageListProps> = (props) => {
    const { messages, messagesEndRef } = props;

    return (
        <div className="flex-1 overflow-y-auto p-10 border border-gray-300">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-2 ${
                        message.fromMe ? "text-right" : "text-left"
                    }`}
                >
                    <div
                        className={`inline-block p-2 rounded-lg ${
                            message.fromMe
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {message.text}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

MessageList.displayName = "MessageList";

export { MessageList };
