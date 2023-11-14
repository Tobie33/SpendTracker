-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "incomeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "expenseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IncomeToincomeType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExpenseToexpenseType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Income_userId_key" ON "Income"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_userId_key" ON "Expense"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_IncomeToincomeType_AB_unique" ON "_IncomeToincomeType"("A", "B");

-- CreateIndex
CREATE INDEX "_IncomeToincomeType_B_index" ON "_IncomeToincomeType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpenseToexpenseType_AB_unique" ON "_ExpenseToexpenseType"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpenseToexpenseType_B_index" ON "_ExpenseToexpenseType"("B");

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncomeToincomeType" ADD CONSTRAINT "_IncomeToincomeType_A_fkey" FOREIGN KEY ("A") REFERENCES "Income"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncomeToincomeType" ADD CONSTRAINT "_IncomeToincomeType_B_fkey" FOREIGN KEY ("B") REFERENCES "incomeType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToexpenseType" ADD CONSTRAINT "_ExpenseToexpenseType_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToexpenseType" ADD CONSTRAINT "_ExpenseToexpenseType_B_fkey" FOREIGN KEY ("B") REFERENCES "expenseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
