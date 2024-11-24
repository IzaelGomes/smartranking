import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';

@Module({
  imports: [PlayersModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class AppModule {}
