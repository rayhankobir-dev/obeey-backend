/*
  Warnings:

  - You are about to drop the column `genre` on the `users` table. All the data in the column will be lost.
  - Made the column `genre_id` on table `podcasts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "podcasts" DROP CONSTRAINT "podcasts_genre_id_fkey";

-- AlterTable
ALTER TABLE "podcasts" ALTER COLUMN "genre_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "genre",
ADD COLUMN     "genreId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
