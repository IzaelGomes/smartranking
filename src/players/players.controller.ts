import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/jogador.interface';
import { PlayerValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { email, name, phoneNumber } = createPlayerDto;

    await this.playersService.createPlayer({ email, name, phoneNumber });
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id', PlayerValidationParamsPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDto);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[] | IPlayer> {
    return await this.playersService.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayerByEmail(
    @Param('_id', PlayerValidationParamsPipe) _id: string,
  ): Promise<IPlayer> {
    return await this.playersService.getPlayerById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayerValidationParamsPipe) _id: string,
  ): Promise<void> {
    return await this.playersService.deletePlayer(_id);
  }
}
