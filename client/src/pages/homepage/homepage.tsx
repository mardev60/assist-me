import { FC } from "react";
import { Navbar } from "../../components";
import { ConversationList } from "../../components/conversation-list";

const Homepage: FC = () => {
    return (
        <div className="max-h-screen flex flex-col bg-gray-200">
            <Navbar />
            <div className="container p-10 w-8/12 flex overflow-y-auto h-screen mx-auto">
                <div className="flex flex-grow">
                    <div className="flex flex-col justify-between flex-grow h-full mx-auto">
                        <ConversationList />
                    </div>
                </div>
            </div>
        </div>
    );
};

Homepage.displayName = "Homepage";

export { Homepage };
