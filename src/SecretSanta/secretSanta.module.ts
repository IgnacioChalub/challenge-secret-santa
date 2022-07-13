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

@Module({
  imports: [SharedModule],
  controllers: [GroupController],
  providers: [
    groupServiceProvider,
    groupRepositoryProvider,
    participantRepositoryProvider,
    participantServiceProvider,
  ],
})
export class GroupModule {}
