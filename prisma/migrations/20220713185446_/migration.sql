/*
  Warnings:

  - The primary key for the `Couples` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Couples" DROP CONSTRAINT "Couples_pkey",
ADD CONSTRAINT "Couples_pkey" PRIMARY KEY ("secretSantaId", "gifteeId", "groupId", "year");
