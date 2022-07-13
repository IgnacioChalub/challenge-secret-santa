import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  participantId: string;
}
