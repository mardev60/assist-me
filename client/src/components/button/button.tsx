import { FC } from "react";

interface ButtonProps {
    handleSend: () => void;
}

const Button: FC<ButtonProps> = (props) => {
    const { handleSend } = props;

    return (
        <button
            onClick={handleSend}
            className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Envoyer
        </button>
    );
};

Button.displayName = "Button";

export { Button };
