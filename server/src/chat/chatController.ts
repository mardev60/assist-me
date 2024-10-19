// src/controllers/chatController.ts

import { Request, Response } from 'express';
import { sendMessageToClaude } from './claudeService';

// Contrôleur pour gérer les requêtes de chat
export const chatController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body; // Récupérer le message

        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        // Envoyer le message à l'API Claude
        const response = await sendMessageToClaude(message);

        // Retourner la réponse à l'utilisateur
        res.json(response);
    } catch (error) {
        console.error('Erreur dans le chatController:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
};




