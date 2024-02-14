-- DropForeignKey
ALTER TABLE "podcasts" DROP CONSTRAINT "podcasts_genre_id_fkey";

-- AlterTable
ALTER TABLE "podcasts" ALTER COLUMN "genre_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;
