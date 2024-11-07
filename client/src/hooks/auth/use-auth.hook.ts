import { useContext } from "react";
import { AppAuthContext } from "../../contexts/app-auth";

export const useAppAuth = () => {
    const context = useContext(AppAuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
