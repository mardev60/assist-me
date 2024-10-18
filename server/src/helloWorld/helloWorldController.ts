import { Request, Response } from 'express';
import { getHelloWorld } from './helloWorldService';

export const helloWorldController = (req: Request, res: Response): void => {
    const helloWorldMessage = getHelloWorld();
    res.json(helloWorldMessage);
};