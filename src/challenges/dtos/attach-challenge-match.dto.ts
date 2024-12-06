import { IsNotEmpty } from 'class-validator';
import { IPlayer } from 'src/players/interfaces/jogador.interface';
import { Result } from '../interfaces/challenge.interface';

export class AttachChallengeMatchDto {
  @IsNotEmpty()
  def: IPlayer;

  @IsNotEmpty()
  result: Array<Result>;
}
