-- CreateTable
CREATE TABLE "CreditLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "academyId" TEXT,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "purchaseId" TEXT,
    "videoSubmissionId" TEXT,
    "note" TEXT,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademySubscription" (
    "id" TEXT NOT NULL,
    "academyId" TEXT NOT NULL,
    "planKey" TEXT NOT NULL,
    "billingInterval" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentPeriodEnd" TIMESTAMP(3),
    "creditsPerPeriod" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditLedger_idempotencyKey_key" ON "CreditLedger"("idempotencyKey");

-- CreateIndex
CREATE INDEX "CreditLedger_userId_idx" ON "CreditLedger"("userId");

-- CreateIndex
CREATE INDEX "CreditLedger_academyId_idx" ON "CreditLedger"("academyId");

-- CreateIndex
CREATE INDEX "CreditLedger_videoSubmissionId_idx" ON "CreditLedger"("videoSubmissionId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademySubscription_stripeSubscriptionId_key" ON "AcademySubscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "AcademySubscription_academyId_idx" ON "AcademySubscription"("academyId");

-- AddForeignKey
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_videoSubmissionId_fkey" FOREIGN KEY ("videoSubmissionId") REFERENCES "VideoSubmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademySubscription" ADD CONSTRAINT "AcademySubscription_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- A ledger row belongs to exactly one account: a user or an academy.
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_one_account_check"
  CHECK (("userId" IS NOT NULL)::int + ("academyId" IS NOT NULL)::int = 1);

-- Backfill: every existing account gets the free signup credit once, except accounts that have
-- already used their free analysis. The deterministic key keeps this safe to run again.
INSERT INTO "CreditLedger" ("id", "userId", "delta", "reason", "note", "idempotencyKey")
SELECT 'cl' || substr(md5(u."id" || ':free_signup'), 1, 24),
       u."id", 1, 'free_signup', 'Backfilled for an existing account', 'free_signup:' || u."id"
FROM "User" u
WHERE NOT EXISTS (SELECT 1 FROM "VideoSubmission" v WHERE v."userId" = u."id" AND v."isFree" = true)
ON CONFLICT ("idempotencyKey") DO NOTHING;
