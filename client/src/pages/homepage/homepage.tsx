import { FC } from "react";
import { InputGroup, MessageList, Navbar } from "../../components";
import { useChat } from "../../hooks";

const Homepage: FC = () => {
    const {
        messages,
        messagesEndRef,
        setInput,
        input,
        handleSend,
        isLoading,
        handleKeyDown,
    } = useChat();

    return (
        <div className="conteneur max-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-col justify-between p-10 flex-grow overflow-y-auto h-screen w-11/12 max-w-4xl mx-auto">
                <MessageList
                    isLoading={isLoading}
                    messages={messages}
                    messagesEndRef={messagesEndRef}
                />
                <InputGroup
                    setInput={setInput}
                    handleKeyDown={handleKeyDown}
                    input={input}
                    handleSend={handleSend}
                />
            </div>
        </div>
    );
};

Homepage.displayName = "Homepage";

export { Homepage };
