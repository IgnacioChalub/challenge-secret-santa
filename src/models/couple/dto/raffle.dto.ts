import { IsNotEmpty, Max, Min } from "class-validator";

export class RaffleDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  @Max(2500)
  @Min(1900)  
  year: number;
}
