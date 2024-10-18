import { FC, ReactNode } from "react";
import { Navigate, useRoutes } from "react-router";
import { Homepage, Login, Register } from "../pages";

const PublicGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const isAuthorized = true;

    return isAuthorized ? <>{element}</> : <Navigate to="/" replace />;
};

const PrivateGuard: FC<{ element: ReactNode }> = ({ element }) => {
    const isAuthorized = !!localStorage.getItem("authToken");

    return isAuthorized ? <>{element}</> : <Navigate to="/connexion" replace />;
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
