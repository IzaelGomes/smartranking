import { Document } from 'mongoose';
import { IPlayer } from 'src/players/interfaces/jogador.interface';
import { ChallengeStatus } from './challenge-status.enum';

export interface IChallenge extends Document {
  requester: IPlayer;
  challengeDate: Date;
  requestDate: Date;
  replyDate: Date;
  players: Array<IPlayer>;
  match: Array<IMatch>;
  category: string;
  status: ChallengeStatus;
}

export interface IMatch extends Document {
  category: string;
  players: Array<IPlayer>;
  def: IPlayer;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
