import { FC } from "react";
import { Button } from "../button";

interface InputGroupProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    handleKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const InputGroup: FC<InputGroupProps> = (props) => {
    const { input, setInput, handleKeyDown, handleSend } = props;

    return (
        <div className="flex  mx-5">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tapez votre message ici..."
                className="flex p-2 px-4 border border-gray-300 rounded w-full"
            />
            <Button onClick={handleSend} className="px-4" />
        </div>
    );
};

InputGroup.displayName = "InputGroup";

export { InputGroup };
