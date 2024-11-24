import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/jogador.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class PlayersService {
  private players: IPlayer[] = [];
  private readonly logger = new Logger(PlayersService.name);
  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const foundPlayer = this.players.find((player) => player.email === email);
    if (foundPlayer) {
      return this.update(foundPlayer, createPlayerDto);
    }

    return this.create(createPlayerDto);
  }

  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.players;
  }

  async getPlayerByEmail(email: string): Promise<IPlayer> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (!foundPlayer) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }

    return foundPlayer;
  }

  async deletePlayer(email: string): Promise<void> {
    const foundPlayer = this.players.find((player) => player.email === email);
    this.players = this.players.filter(
      (player) => player.email !== foundPlayer.email,
    );
    return;
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { email, name, phoneNumber } = createPlayerDto;

    const player: IPlayer = {
      id: randomUUID(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPlayerPhoto: 'www.google.com.br/1222',
    };

    this.logger.log(`Jogador: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(foundPlayer: IPlayer, createPlayer: CreatePlayerDto): void {
    const { name } = createPlayer;

    foundPlayer.name = name;
    return;
  }
}
