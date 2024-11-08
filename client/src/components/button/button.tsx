import { FC } from "react";

interface ButtonProps {
    onClick: () => void;
    className?: string;
}

const Button: FC<ButtonProps> = (props) => {
    const { onClick, className } = props;

    return (
        <button
            onClick={onClick}
            className={`ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${className}`}
        >
            Envoyer
        </button>
    );
};

Button.displayName = "Button";

export { Button };
