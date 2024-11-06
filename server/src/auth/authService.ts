import { User } from './models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const registerUser = async (newUser: User): Promise<string> => {
    const userExists = await prisma.users.findUnique({where: {email: newUser.email}});
    if (userExists) {
        throw new Error("L'utilisateur existe déjà");
    }
    const hashedPassword = await hashPassword(newUser.password);
    await prisma.users.create({data : {email: newUser.email, password: hashedPassword, roleId: 1}});
    return 'Utilisateur enregistré avec succès';
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await prisma.users.findUnique({where: {email: email}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error(user ? 'Invalid password' : 'User not found');
    }
    return jwt.sign({ id : user.id, email: user.email, roleId : user.roleId }, 'abcd123', { expiresIn: '1h' });
};