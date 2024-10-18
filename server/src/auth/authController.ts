import { Request, Response } from 'express';
import { loginUser, registerUser } from './authService';
import { User } from './models/userModel';

export const registerController = async (req: Request, res: Response): Promise<void> => {
    const newUser: User = req.body;
    try {
        const message = await registerUser(newUser);
        res.status(201).json({ message });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const meController = (req: Request, res: Response): void => {
    if (!req.user) {
        res.status(400).json({ error: 'Utilisateur non authentifié' });
        return;
    }

    const { email, username } = req.user;
    res.status(200).json({ email, username });
};