import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateChallangeDto } from './dtos/create-challenge.dto';
import { ChallengesService } from './challenges.service';
import { IChallenge } from './interfaces/challenge.interface';
import { challengeStatusValidationPipe } from 'src/players/pipes/challenge-status-validation.pipe';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AttachChallengeMatchDto } from './dtos/attach-challenge-match.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challangeService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallange(
    @Body() createChallangeDto: CreateChallangeDto,
  ): Promise<IChallenge> {
    return await this.challangeService.createChallange(createChallangeDto);
  }

  @Get()
  async getAllChallenges(
    @Query('playerId') id: string,
  ): Promise<Array<IChallenge>> {
    if (id) {
      return await this.challangeService.getChallengeByPlayer(id);
    }

    return await this.challangeService.getAllChallenges();
  }

  @Put('/:challenge')
  async updateChallenge(
    @Body(challengeStatusValidationPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('challenge') challengeId: string,
  ): Promise<void> {
    return await this.challangeService.updateChallenge(
      updateChallengeDto,
      challengeId,
    );
  }

  @Post('/:challenge/match')
  async attachChallengeOnMatch(
    @Body() createMatchDto: AttachChallengeMatchDto,
    @Param('challenge') _id: string,
  ) {
    return await this.challangeService.attachChallengeOnMatch(
      _id,
      createMatchDto,
    );
  }

  @Delete('/:_id')
  async deleteChallenge() {}
}
