"use server";

import prisma from "@/lib/prisma";

export async function addTask(
  title: string,
  userId: string,
  category: string,
  importance: string,
) {
  await prisma.task.create({
    data: {
      userId,
      title: title,
      isCompleted: false,
      categoryId: category,
      importance: importance,
    },
  });
}

export async function getTask(userId: string) {
  return await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });
}
