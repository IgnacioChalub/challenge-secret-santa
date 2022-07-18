import { Body, Controller, Inject, Param, Post, Put } from "@nestjs/common";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { Group } from "@models/group/entities";
import { IGroupService, IParticipantService } from "@SecretSanta/service";
import { CreateParticipantDto } from "@models/participant/dto/create-participant.dto";
import { Participant } from "@prisma/client";
import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";

@Controller("group")
export class GroupController {
  constructor(
    @Inject(IGroupService) private readonly groupService: IGroupService,
  ) {}

  @Post()
  async createGroup(@Body() group: CreateGroupDto): Promise<Group> {
    return await this.groupService.create(group);
  }

  @Post("/add-participant")
  async addParticipant(@Body() addParticipantDto: AddParticipantDto): Promise<void> {
    return await this.groupService.addParticipant(addParticipantDto);
  }

  @Post("/raffle")
  async raffle(@Body() raffleDto: RaffleDto): Promise<Couple[]> {
    return await this.groupService.raffle(raffleDto)
  }
}