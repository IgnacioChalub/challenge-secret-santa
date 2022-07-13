import { Group } from "@models/group/entities";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";

export abstract class IGroupService {
  abstract create(group: CreateGroupDto): Promise<Group>;
  abstract addParticipant(addParticipantDto: AddParticipantDto): Promise<void>;
  abstract raffle(raffleDto: RaffleDto): Promise<Couple[]>;
}
