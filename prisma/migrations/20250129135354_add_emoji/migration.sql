/*
  Warnings:

  - Added the required column `emoji` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "emoji" TEXT NOT NULL;
