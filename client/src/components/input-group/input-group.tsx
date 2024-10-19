import { FC } from "react";
import { Button } from "../button";

interface InputGroupProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
}

const InputGroup: FC<InputGroupProps> = (props) => {
    const { input, setInput, handleSend } = props;

    return (
        <div className="flex py-4 px-10 border-t border-gray-300 border">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="flex-1 p-2 border border-gray-300 rounded"
            />
            <Button handleSend={handleSend} />
        </div>
    );
};

InputGroup.displayName = "InputGroup";

export { InputGroup };
