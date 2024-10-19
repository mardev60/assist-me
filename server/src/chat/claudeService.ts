import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk'; 

dotenv.config({ path: './.env' });

if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Erreur : La clé d\'API Anthropic n\'est pas définie dans le fichier .env');
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


export const sendMessageToClaude = async (message: string): Promise<any> => {
    try {
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620", 
            max_tokens: 100, 
            messages: [{ role: "user", content: message }], 
        });

        return response; 
    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API Claude:', error);
        throw new Error('Erreur lors de la communication avec l\'API Claude');
    }
}
