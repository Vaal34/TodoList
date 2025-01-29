/*
  Warnings:

  - You are about to drop the column `description` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `importance` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('FAIBLE', 'MOYEN', 'FORT');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "description",
ADD COLUMN     "importance" "Importance" NOT NULL;
