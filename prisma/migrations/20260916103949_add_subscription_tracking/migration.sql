-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_stripeSubscriptionId_key" ON "Purchase"("stripeSubscriptionId");

