/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `genres` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");
