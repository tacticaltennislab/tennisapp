-- Additive only: every new column is nullable or has a default, so existing rows and
-- the currently deployed code are unaffected.
ALTER TABLE "VideoSubmission" ADD COLUMN "isFree" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "VideoSubmission" ADD COLUMN "footageType" TEXT;
ALTER TABLE "VideoSubmission" ADD COLUMN "tacticalNotes" TEXT;
ALTER TABLE "VideoSubmission" ADD COLUMN "technicalNotes" TEXT;
ALTER TABLE "VideoSubmission" ADD COLUMN "publishConsent" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "VideoSubmission" ADD COLUMN "publishedAt" TIMESTAMP(3);
