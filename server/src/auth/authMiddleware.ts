import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Token manquant" });
        return;
    }

    jwt.verify(token, "abcd123", (err: any, user: any) => {
        if (err) {
            res.status(403).json({ message: "Token invalide" });
            return;
        }

        req.user = {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
        };

        next();
    });
};
