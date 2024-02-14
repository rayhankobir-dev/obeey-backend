/*
  Warnings:

  - You are about to drop the column `promotion_email` on the `email_settings` table. All the data in the column will be lost.
  - You are about to drop the column `security_email` on the `email_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "email_settings" DROP COLUMN "promotion_email",
DROP COLUMN "security_email",
ADD COLUMN     "promotionalEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "securityEmail" BOOLEAN NOT NULL DEFAULT true;
