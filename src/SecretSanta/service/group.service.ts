import { Inject, Injectable } from "@nestjs/common";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { Group } from "@models/group/entities";
import { IGroupRepository } from "@SecretSanta/repository/group.repository.interface";
import { IGroupService } from "@SecretSanta/service/group.service.interface";
import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject(IGroupRepository)
    private readonly groupRepository: IGroupRepository,
  ) {}

  async create(group: CreateGroupDto): Promise<Group> {
    return await this.groupRepository.createGroup(group);
  }

  async addParticipant(addParticipantDto: AddParticipantDto): Promise<void> {
    await this.groupRepository.addParticipant(addParticipantDto);
  }

  /**
   * 1. a person can not be their own secret santa
   * 2. a person can be secret santa if it has not been in the last 2 years
   */
  async raffle(raffleDto: RaffleDto): Promise<Couple[]> {
    console.log(raffleDto)
    return []    
  }

}
