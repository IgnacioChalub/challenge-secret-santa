import { IBaseRepository } from "@shared/repository";
import { Participant } from "@models/participant/entities";
import { RaffleDto } from "@models/couple/dto";

export abstract class IParticipantRepository extends IBaseRepository<Participant> {
  abstract getAllParticipantsInGroup(raffleDto: RaffleDto): Promise<Participant[]>;
}
