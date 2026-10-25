-- AlterTable
ALTER TABLE "VideoSubmission" ADD COLUMN     "focusAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "skillLevel" TEXT;
