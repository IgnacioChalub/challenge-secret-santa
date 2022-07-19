import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@shared/service";
import { BaseRepository } from "@shared/repository";
import { Group } from "@models/group/entities";
import { IGroupRepository } from "@SecretSanta/repository/group.repository.interface";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";

@Injectable()
export class GroupRepository
  extends BaseRepository<Group>
  implements IGroupRepository
{
  constructor(db: DatabaseService) {
    super(db, "group");
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.create({
      participants: {
        create: {
          participant: {
            connect: {
              id: createGroupDto.participantId,
            },
          },
        },
      },
    });
  }

  async addParticipant(addParticipantDto: AddParticipantDto): Promise<void> {
    await this.update(addParticipantDto.groupId, {
      data: {
        participants: {
          create: {
            participant: {
              connect: {
                name: addParticipantDto.participantName,
              },
            },
          },
        },
      },
    });
  }

}
