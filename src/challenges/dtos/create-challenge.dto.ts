import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { IPlayer } from 'src/players/interfaces/jogador.interface';

export class CreateChallangeDto {
  @IsNotEmpty()
  @IsDateString()
  challangeDate: Date;

  @IsNotEmpty()
  requester: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<IPlayer>;
}
