import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallangeDto } from './dtos/create-challenge.dto';
import { IChallenge, IMatch } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AttachChallengeMatchDto } from './dtos/attach-challenge-match.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private challengeModel: Model<IChallenge>,
    @InjectModel('Match') private matchModel: Model<IMatch>,
    private playersService: PlayersService,
    private categoryService: CategoriesService,
  ) {}
  async createChallange(
    createChallengeDto: CreateChallangeDto,
  ): Promise<IChallenge> {
    const allPlayers = await this.playersService.getAllPlayers();

    createChallengeDto.players.map((player) => {
      const exist = allPlayers.filter(
        (playerFil) => playerFil._id == player._id,
      );

      if (exist.length === 0)
        throw new BadRequestException('Jogador não encontrado!');
    });

    const requestPlayer = createChallengeDto.players.find(
      (player) => player._id === createChallengeDto.requester,
    );

    if (!requestPlayer)
      throw new BadRequestException(
        'O solicitante deve ser um jogador da partida!',
      );

    const playerCategory = await this.categoryService.getCategoryByplayer(
      createChallengeDto.requester,
    );

    const challenge = new this.challengeModel(createChallengeDto);
    challenge.category = playerCategory.category;
    challenge.challengeDate = new Date();
    challenge.status = ChallengeStatus.PENDING;

    return await challenge.save();
  }

  async getAllChallenges() {
    return await this.challengeModel
      .find()
      .populate('players')
      .populate('requester')
      .populate('match')
      .exec();
  }

  async getChallengeByPlayer(_id: string): Promise<IChallenge[]> {
    const player = this.playersService.getPlayerById(_id);

    if (!player) throw new NotFoundException('Jogador não encontrado!');

    return await this.challengeModel
      .find()
      .where('players')
      .in([_id])
      .populate('players')
      .populate('requester')
      .populate('match')
      .exec();
  }

  async updateChallenge(updateChallengeDto: UpdateChallengeDto, _id: string) {
    const challenge = await this.challengeModel.findOne({ _id }).exec();

    if (!challenge) throw new NotFoundException('Desafio não encontrado');

    challenge.status = updateChallengeDto.status as ChallengeStatus;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: updateChallengeDto })
      .exec();
    return;
  }

  async attachChallengeOnMatch(
    _id: string,
    attachChallengeMatchDto: AttachChallengeMatchDto,
  ): Promise<void> {
    const foundChallenge = await this.challengeModel.findById(_id).exec();

    if (!foundChallenge)
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);

    const playerFilter = foundChallenge.players.filter(
      (player) => player == attachChallengeMatchDto.def,
    );

    console.log(playerFilter);

    if (playerFilter.length === 0)
      throw new BadRequestException(
        'O jogador vencedor não faz parte do desafio',
      );

    const createdMatch = new this.matchModel(attachChallengeMatchDto);

    createdMatch.category = foundChallenge.category;

    createdMatch.players = foundChallenge.players;

    const result = await createdMatch.save();

    foundChallenge.status = ChallengeStatus.DONE;

    foundChallenge.match = result.id;

    try {
      await this.challengeModel.findOneAndUpdate(
        { _id },
        { $set: foundChallenge },
      );
    } catch (error) {
      await this.matchModel.deleteOne({ id: result.id }).exec();
      throw new InternalServerErrorException();
    }
  }

  async deleteChallenge(_id: string) {
    const foundChallenge = await this.challengeModel.findById(_id).exec();

    if (!foundChallenge) {
      throw new BadRequestException('Desafio não encontrado!');
    }

    foundChallenge.status = ChallengeStatus.CANCELED;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: foundChallenge })
      .exec();
  }
}
