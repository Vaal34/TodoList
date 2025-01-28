"use server"

import prisma from "@/lib/prisma";

export async function addTask(title: string, userId: string, description: string, categoryId: string) {
    await prisma.task.create({
        data: {
            userId,
            description: description,
            title: title,
            isCompleted: false,
            categoryId: categoryId,
        },
    });
}

export async function getTask(userId: string){
    return await prisma.task.findMany({
        where: {
            userId: userId,
        },
    })
}