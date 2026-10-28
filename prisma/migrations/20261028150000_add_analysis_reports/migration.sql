-- AlterTable
ALTER TABLE "VideoSubmission" ADD COLUMN     "actualDurationSec" DOUBLE PRECISION,
ADD COLUMN     "analysisType" TEXT,
ADD COLUMN     "declaredMinutes" DOUBLE PRECISION,
ADD COLUMN     "reviewedById" TEXT;

-- CreateTable
CREATE TABLE "SubmissionObservation" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "timeSec" DOUBLE PRECISION NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pinX" DOUBLE PRECISION,
    "pinY" DOUBLE PRECISION,
    "drawing" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionReport" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "issues" JSONB NOT NULL DEFAULT '[]',
    "tactical" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "drills" JSONB NOT NULL DEFAULT '[]',
    "charting" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "SubmissionReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubmissionObservation_submissionId_idx" ON "SubmissionObservation"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionReport_submissionId_key" ON "SubmissionReport"("submissionId");

-- AddForeignKey
ALTER TABLE "VideoSubmission" ADD CONSTRAINT "VideoSubmission_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionObservation" ADD CONSTRAINT "SubmissionObservation_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "VideoSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionReport" ADD CONSTRAINT "SubmissionReport_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "VideoSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

