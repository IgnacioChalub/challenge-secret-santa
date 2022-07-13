import { IBaseRepository } from "@shared/repository";
import { Participant } from "@models/participant/entities";

export abstract class IParticipantRepository extends IBaseRepository<Participant> {}
