import { CreateParticipantDto } from "@models/participant/dto";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Participant } from "@prisma/client";
import { IParticipantService } from "@SecretSanta/service";

@Controller("participant")
export class ParticipantControlller {
  constructor(
    @Inject(IParticipantService)
    private readonly participantService: IParticipantService
  ) {}

  @Post()
  async createParticipant(@Body() participant: CreateParticipantDto): Promise<Participant> {
    return await this.participantService.createParticipant(participant);
  }
  
}