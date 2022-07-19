import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { Participant } from "@models/participant/entities";
import { IParticipantRepository } from "@SecretSanta/repository/participant.repository.interface";
import { RaffleDto } from "@models/couple/dto";

@Injectable()
export class ParticipantRepository
  extends BaseRepository<Participant>
  implements IParticipantRepository
{
  constructor(db: DatabaseService) {
    super(db, "participant");
  }

  async getAllParticipantsInGroup(raffleDto: RaffleDto): Promise<Participant[]> {
    return await this.findMany({
      where: {
          groups: {
            every: {  
              groupId: raffleDto.groupId
            }
          }
      }
    })
  }
}
