import { Document } from 'mongoose';
import { IPlayer } from 'src/players/interfaces/jogador.interface';

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Array<Event>;
  players: Array<IPlayer>;
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
