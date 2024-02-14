-- AlterTable
ALTER TABLE "podcasts" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'english';

-- CreateTable
CREATE TABLE "email_settings" (
    "setting_id" TEXT NOT NULL,
    "promotion_email" BOOLEAN NOT NULL DEFAULT true,
    "security_email" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "email_settings_pkey" PRIMARY KEY ("setting_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_settings_user_id_key" ON "email_settings"("user_id");

-- AddForeignKey
ALTER TABLE "email_settings" ADD CONSTRAINT "email_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
