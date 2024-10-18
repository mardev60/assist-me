import { FC } from "react";
import { InputGroup, MessageList, Navbar } from "../../components";
import { useChat } from "../../hooks";

const Homepage: FC = () => {
    const { messages, messagesEndRef, setInput, input, handleSend } = useChat();

    return (
        <div className="conteneur max-h-screen flex flex-col">
            <Navbar />
            <div className="contenu flex flex-col justify-between p-10 flex-grow overflow-y-auto">
                <MessageList
                    messages={messages}
                    messagesEndRef={messagesEndRef}
                />
                <InputGroup
                    setInput={setInput}
                    input={input}
                    handleSend={handleSend}
                />
            </div>
        </div>
    );
};

Homepage.displayName = "Homepage";

export { Homepage };
