import { User } from '../auth/models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: { email: string, username: string };
        }
    }
}