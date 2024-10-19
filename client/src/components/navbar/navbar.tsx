import { FC } from "react";
import { useNavigate } from "react-router";

const Navbar: FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/connexion");
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Batoul</div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleLogout}
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Deconnexion
                    </button>
                </div>
            </div>
        </nav>
    );
};

export { Navbar };
