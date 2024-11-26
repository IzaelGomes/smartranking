import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    const { email } = createPlayerDto;

    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (foundPlayer)
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado.`,
      );

    const player = new this.playerModel(createPlayerDto);

    return await player.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const foundPlayer = await this.playerModel.findOne({ _id }).exec();

    if (!foundPlayer) throw new NotFoundException(`Jogador não encontrado`);

    await this.playerModel
      .findOneAndUpdate(
        {
          _id,
        },
        { $set: updatePlayerDto },
      )
      .exec();

    return;
  }

  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(_id: string): Promise<IPlayer> {
    const foundPlayer = await this.playerModel.findOne({ _id }).exec();

    if (!foundPlayer) {
      throw new NotFoundException(`Jogador não encontrado`);
    }

    return foundPlayer;
  }

  async deletePlayer(_id: string): Promise<void> {
    const foundPlayer = await this.playerModel.findOne({ _id }).exec();

    if (!foundPlayer) {
      throw new NotFoundException(`Jogador não encontrado`);
    }
    await this.playerModel.deleteOne({ _id });
    return;
  }
}
