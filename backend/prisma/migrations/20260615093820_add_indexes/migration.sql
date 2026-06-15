/*
  Warnings:

  - You are about to drop the `SalesData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SalesData";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "sales" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analytics_product_idx" ON "Analytics"("product");

-- CreateIndex
CREATE INDEX "Analytics_date_idx" ON "Analytics"("date");
