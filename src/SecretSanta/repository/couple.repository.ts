import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { ICoupleRepository } from "./couple.repository.interface";

@Injectable()
export class CoupleRepository
  extends BaseRepository<Couple>
  implements ICoupleRepository
{
    constructor(db: DatabaseService) {
        super(db, "couple");
    }

    async yearAlreadyRaffled(raffleDto: RaffleDto): Promise<boolean> {
        const data = await this.findOne({
          where: {
            groupId: raffleDto.groupId,
            year: raffleDto.year     
          }
        })
        if(data) return true;
        return false;
      }

    async getPreviousCouples(raffleDto: RaffleDto): Promise<Couple[]> {
        return await this.findMany({
            where: {
                OR: [ 
                    {
                        groupId: raffleDto.groupId,
                        year:  raffleDto.year-1
                    },
                    {
                        groupId: raffleDto.groupId,
                        year:  raffleDto.year-2
                    },
                ] 
            },
            include: {
                secretSanta: true,
                giftee: true
            }
        })
    }
}