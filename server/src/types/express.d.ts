import { User } from '../auth/models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number, email: string, roleId: number;
};
        }
    }
}