import { FC } from "react";
import { InputGroup, MessageList } from "../../components";
import { useChat } from "../../hooks";

const Homepage: FC = () => {
    const { messages, messagesEndRef, setInput, input, handleSend } = useChat();

    return (
        <div className="flex flex-col h-screen justify-between p-10">
            <MessageList messages={messages} messagesEndRef={messagesEndRef} />

            <InputGroup
                setInput={setInput}
                input={input}
                handleSend={handleSend}
            />
        </div>
    );
};

Homepage.displayName = "Homepage";

export { Homepage };
