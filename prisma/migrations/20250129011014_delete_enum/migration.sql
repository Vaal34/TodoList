/*
  Warnings:

  - Changed the type of `importance` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "importance",
ADD COLUMN     "importance" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Importance";
