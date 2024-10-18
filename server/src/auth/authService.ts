import { User } from './models/userModel';
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersFilePath = path.join(__dirname, './users.json');

export const readUsersFromFile = (): User[] => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Erreur lors du parsing du fichier users.json:", error);
        return [];
    }
};

const saveUsersToFile = (users: User[]): void => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const userExists = (email: string, users: User[]): boolean => users.some(user => user.email === email);

const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const registerUser = async (newUser: User): Promise<string> => {
    const users = readUsersFromFile();
    if (userExists(newUser.email, users)) {
        throw new Error("L'utilisateur existe déjà");
    }
    const hashedPassword = await hashPassword(newUser.password);
    saveUsersToFile([...users, { ...newUser, password: hashedPassword }]);
    return 'Utilisateur enregistré avec succès';
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    const users = readUsersFromFile();
    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error(user ? 'Invalid password' : 'User not found');
    }
    return jwt.sign({ email: user.email, username: user.username }, 'abcd123', { expiresIn: '1h' });
};