import { IsOptional } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  status: string;
}
