/*
  Warnings:

  - You are about to drop the `Couples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Couples" DROP CONSTRAINT "Couples_gifteeId_fkey";

-- DropForeignKey
ALTER TABLE "Couples" DROP CONSTRAINT "Couples_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Couples" DROP CONSTRAINT "Couples_secretSantaId_fkey";

-- DropTable
DROP TABLE "Couples";

-- CreateTable
CREATE TABLE "Couple" (
    "id" TEXT NOT NULL,
    "secretSantaId" TEXT NOT NULL,
    "gifteeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("secretSantaId","gifteeId","groupId","year")
);

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_secretSantaId_fkey" FOREIGN KEY ("secretSantaId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_gifteeId_fkey" FOREIGN KEY ("gifteeId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
