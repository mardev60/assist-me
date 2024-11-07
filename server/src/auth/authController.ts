import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { loginUser, registerUser } from "./authService";
import { User } from "./models/userModel";

export const registerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    await body("email").isEmail().withMessage("Email invalide").run(req);
    await body("password")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères")
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const newUser: User = req.body;

    try {
        const message = await registerUser(newUser);
        res.status(201).json({ message });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    await body("email").isEmail().withMessage("Email invalide").run(req);
    await body("password")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères")
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 3600000,
        });
        res.status(200).json({ message: "Login succesfull" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const meController = (req: Request, res: Response): void => {
    if (!req.user) {
        res.status(400).json({ error: "Utilisateur non authentifié" });
        return;
    }
    const { email, username } = req.user;
    res.status(200).json({ email, username });
};

export const logoutController = (req: Request, res: Response): void => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
    });
    res.status(200).json({ message: "Déconnexion réussie" });
};
