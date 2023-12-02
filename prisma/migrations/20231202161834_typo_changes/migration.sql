/*
  Warnings:

  - You are about to drop the column `idcomeTypeName` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Income" DROP COLUMN "idcomeTypeName",
ADD COLUMN     "incomeTypeName" TEXT NOT NULL DEFAULT '';
