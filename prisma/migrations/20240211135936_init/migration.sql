/*
  Warnings:

  - Added the required column `genre_image` to the `genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `genres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "genre_image" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
