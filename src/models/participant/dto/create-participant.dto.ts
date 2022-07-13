import { IsNotEmpty } from "class-validator";

export class CreateParticipantDto {
  @IsNotEmpty()
  name: string;
}
