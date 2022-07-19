import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { Group } from "@models/group/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IGroupRepository extends IBaseRepository<Group> {
  abstract createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
  abstract addParticipant(addParticipantDto: AddParticipantDto): Promise<void>;
}

