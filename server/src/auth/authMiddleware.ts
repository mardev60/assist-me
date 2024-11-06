import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token manquant' });
        return;
    }

    jwt.verify(token, 'abcd123', (err, user: any) => {
        if (err) {
            res.status(403).json({ message: 'Token invalide' });
            return;
        }

        req.user = { email: user.email, username: user.username, roleId: user.roleId };
        next();
    });
};

