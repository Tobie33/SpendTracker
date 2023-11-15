/*
  Warnings:

  - You are about to drop the `_ExpenseToexpenseType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expenseTypeId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ExpenseToexpenseType" DROP CONSTRAINT "_ExpenseToexpenseType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExpenseToexpenseType" DROP CONSTRAINT "_ExpenseToexpenseType_B_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "expenseTypeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ExpenseToexpenseType";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseTypeId_fkey" FOREIGN KEY ("expenseTypeId") REFERENCES "expenseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
