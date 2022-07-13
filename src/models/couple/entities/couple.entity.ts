import { Participant } from "@models/participant/entities";
import { Group } from "@prisma/client";

export class Couple {
    secretSanta: Participant;
    giftee: Participant;
    group: Group;
    year: number;
}