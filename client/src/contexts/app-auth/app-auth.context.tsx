import { createContext, FC, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

type AuthContextProps = {
    authData: boolean;
};

export const AppAuthContext = createContext<AuthContextProps | undefined>(
    undefined
);

export const AppAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState(false);

    const getMe = async () => {
        try {
            const response = await axiosInstance.get("/me");
            return response;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getMe();

            if (response) {
                setAuthData(true);
            }
        };

        fetchUser();
    }, []);

    return (
        <AppAuthContext.Provider value={{ authData }}>
            {children}
        </AppAuthContext.Provider>
    );
};
