import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk'; // Importer le SDK

dotenv.config();


const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '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',
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


