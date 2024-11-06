import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRoleId: number) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user;

        if (!user || user.roleId !== requiredRoleId) {
            res.status(403).json({ message: 'Accès interdit : rôle insuffisant' });
            return;
        }

        next();
    };
};