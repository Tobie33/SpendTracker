/*
  Warnings:

  - You are about to drop the `_IncomeToincomeType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `incomeTypeId` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IncomeToincomeType" DROP CONSTRAINT "_IncomeToincomeType_A_fkey";

-- DropForeignKey
ALTER TABLE "_IncomeToincomeType" DROP CONSTRAINT "_IncomeToincomeType_B_fkey";

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "incomeTypeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_IncomeToincomeType";

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "incomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
