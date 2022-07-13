import { IsNotEmpty, Max, Min } from "class-validator";

export class AddParticipantDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  participantName: string;
}
