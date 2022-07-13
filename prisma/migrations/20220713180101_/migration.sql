-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantsOnGroups" (
    "participantId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "ParticipantsOnGroups_pkey" PRIMARY KEY ("participantId","groupId")
);

-- CreateTable
CREATE TABLE "Couples" (
    "secretSantaId" TEXT NOT NULL,
    "gifteeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Couples_pkey" PRIMARY KEY ("secretSantaId","gifteeId","year")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");

-- AddForeignKey
ALTER TABLE "ParticipantsOnGroups" ADD CONSTRAINT "ParticipantsOnGroups_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnGroups" ADD CONSTRAINT "ParticipantsOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couples" ADD CONSTRAINT "Couples_secretSantaId_fkey" FOREIGN KEY ("secretSantaId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couples" ADD CONSTRAINT "Couples_gifteeId_fkey" FOREIGN KEY ("gifteeId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couples" ADD CONSTRAINT "Couples_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
