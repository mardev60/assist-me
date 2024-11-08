import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createConversation = async (
    name: string,
    userId: number
): Promise<number> => {
    const conversationCreated = await prisma.conversations.create({
        data: {
            title: name,
            userId: userId,
        },
    });

    return conversationCreated.id;
};

export const deleteConversation = async (
    conversationId: number,
    userId: number
): Promise<string> => {
    const conversationDeleted = await prisma.$transaction(async (prisma) => {
        await prisma.messages.deleteMany({
            where: {
                conversationId: conversationId,
            },
        });

        return prisma.conversations.delete({
            where: {
                id: conversationId,
                userId: userId,
            },
        });
    });

    return "conversation deleted" + conversationDeleted.id;
};
