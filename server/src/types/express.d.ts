import { User } from '../auth/models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: {
                roleId: number; email: string, username: string 
};
        }
    }
}