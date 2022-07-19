import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";
import { IBaseRepository } from "@shared/repository";

export abstract class ICoupleRepository extends IBaseRepository<Couple> {
    abstract yearAlreadyRaffled(raffleDto: RaffleDto): Promise<boolean>
    abstract getPreviousCouples(raffleDto: RaffleDto): Promise<Couple[]>;
}