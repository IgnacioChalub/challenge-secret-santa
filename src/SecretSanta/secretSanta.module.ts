import {
  GroupService,
  IGroupService,
  IParticipantService,
  ParticipantService,
} from "@SecretSanta/service";
import { IGroupRepository } from "@SecretSanta/repository/group.repository.interface";
import { GroupRepository } from "@SecretSanta/repository/group.repository";
import { IParticipantRepository } from "@SecretSanta/repository/participant.repository.interface";
import { ParticipantRepository } from "@SecretSanta/repository/participant.repository";
import { SharedModule } from "@shared/shared.module";
import { GroupController } from "@SecretSanta/controller/group.controller";
import { Module } from "@nestjs/common";
import { ICoupleRepository } from "./repository/couple.repository.interface";
import { CoupleRepository } from "./repository/couple.repository";
import { ParticipantControlller } from "./controller/participant.controller";

const groupServiceProvider = {
  provide: IGroupService,
  useClass: GroupService,
};

const groupRepositoryProvider = {
  provide: IGroupRepository,
  useClass: GroupRepository,
};

const participantServiceProvider = {
  provide: IParticipantService,
  useClass: ParticipantService,
};

const participantRepositoryProvider = {
  provide: IParticipantRepository,
  useClass: ParticipantRepository,
};

const coupleRepositoryProvider = {
  provide: ICoupleRepository,
  useClass: CoupleRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [GroupController, ParticipantControlller],
  providers: [
    groupServiceProvider,
    groupRepositoryProvider,
    participantRepositoryProvider,
    participantServiceProvider,
    coupleRepositoryProvider
  ],
})
export class GroupModule {}
