import { FC, ReactNode } from "react";
import { Navigate, useRoutes } from "react-router";
import { Homepage, Login, Register } from "../pages";
import axiosInstance from "../config/axiosConfig";

import { useEffect, useState } from "react";

const PublicGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const [user, setUser] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/me", { withCredentials: true });
                setUser(!!response.data);
            } catch {
                setUser(false);
            }
        };

        fetchUser();
    }, []);

    if (user === null) {
        return null;
    }

    return !user ? <>{element}</> : <Navigate to="/" replace />;
};

const PrivateGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const [user, setUser] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/me", { withCredentials: true });
                setUser(!!response.data);
            } catch {
                setUser(false);
            }
        };

        fetchUser();
    }, []);

    if (user === null) {
        return null;
    }

    return user ? <>{element}</> : <Navigate to="/connexion" replace />;
};

export function Router() {
    return useRoutes([
        {
            path: "/",
            element: <PrivateGuard element={<Homepage />} />,
        },
        {
            path: "/inscription",
            element: <PublicGuard element={<Register />} />,
        },
        {
            path: "/connexion",
            element: <PublicGuard element={<Login />} />,
        },

        { path: "/*", element: <Navigate to="/404" replace /> },
    ]);
}
