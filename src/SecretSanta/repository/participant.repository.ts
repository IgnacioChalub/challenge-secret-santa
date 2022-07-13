import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { Participant } from "@models/participant/entities";
import { IParticipantRepository } from "@SecretSanta/repository/participant.repository.interface";

@Injectable()
export class ParticipantRepository
  extends BaseRepository<Participant>
  implements IParticipantRepository
{
  constructor(db: DatabaseService) {
    super(db, "participant");
  }
}
