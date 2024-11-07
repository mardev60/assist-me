import { FC, ReactNode } from "react";
import { Navigate, useRoutes } from "react-router";
import { useAppAuth } from "../hooks/auth/use-auth.hook";
import { Homepage, Login, Register } from "../pages";

const PublicGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const { authData } = useAppAuth();
    return !authData ? <>{element}</> : <Navigate to="/" replace />;
};

const PrivateGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const { authData } = useAppAuth();
    return authData ? <>{element}</> : <Navigate to="/connexion" replace />;
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
