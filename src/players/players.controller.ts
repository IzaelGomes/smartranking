import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/jogador.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { email, name, phoneNumber } = createPlayerDto;

    await this.playersService.createPlayer({ email, name, phoneNumber });
  }

  @Get()
  async getPlayers(
    @Query('email') email: string,
  ): Promise<IPlayer[] | IPlayer> {
    if (email) {
      return await this.playersService.getPlayerByEmail(email);
    }
    return await this.playersService.getAllPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    return await this.playersService.deletePlayer(email);
  }
}
