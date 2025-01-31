"use server";

import prisma from "@/lib/prisma";

export async function addCategory(name: string, userId: string, emoji: string) {
  await prisma.category.create({
    data: {
      name,
      userId,
      emoji,
    },
  });
}

export async function getCategory(userId: string) {
  return await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function deleteCategory(categoryId: string) {
  return await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
}
