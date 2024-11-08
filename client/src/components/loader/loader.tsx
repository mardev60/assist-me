import { FC } from "react";

const Loader: FC = () => {
    return (
        <div className="flex gap-1 py-4">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                    style={{ animationDelay: "0.2s" }}
                ></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                    style={{ animationDelay: "0.4s" }}
                ></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
        </div>
    );
};

Loader.displayName = "Loader";

export { Loader };
