/*
  Warnings:

  - You are about to drop the column `typeColor` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `typeColor` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "typeColor";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "typeColor";

-- AlterTable
ALTER TABLE "expenseType" ADD COLUMN     "typeColor" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "incomeType" ADD COLUMN     "typeColor" TEXT NOT NULL DEFAULT '';
