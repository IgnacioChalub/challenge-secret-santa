import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { Group } from "@models/group/entities";
import { Participant } from "@models/participant/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IGroupRepository extends IBaseRepository<Group> {
  abstract createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
  abstract addParticipant(addParticipantDto: AddParticipantDto): Promise<void>;
  abstract getAllParticipantsInGroup(raffleDto: RaffleDto): Promise<any[]>;
}

