import { CreateParticipantDto } from "@models/participant/dto/create-participant.dto";
import { Participant } from "@models/participant/entities";
import { Inject, Injectable } from "@nestjs/common";
import { IParticipantRepository } from "@SecretSanta/repository/participant.repository.interface";
import { IParticipantService } from "./participant.service.interface";

@Injectable()
export class ParticipantService implements IParticipantService {
  constructor(
    @Inject(IParticipantRepository)
    private readonly participantRepository: IParticipantRepository
  ) {}

  async createParticipant(
    participant: CreateParticipantDto
  ): Promise<Participant> {
    return await this.participantRepository.create(participant);
  }
}
