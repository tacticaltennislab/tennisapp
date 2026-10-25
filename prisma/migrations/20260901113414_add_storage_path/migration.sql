/*
  Warnings:

  - Added the required column `storagePath` to the `VideoSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoSubmission" ADD COLUMN     "storagePath" TEXT NOT NULL;
