import { CreateParticipantDto } from "@models/participant/dto/create-participant.dto";
import { Participant } from "@models/participant/entities/participant.entity";

export abstract class IParticipantService {
  abstract createParticipant(
    participant: CreateParticipantDto
  ): Promise<Participant>;
}
