import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://izaelgomes127:0p1r4USlUVhenNRL@cluster0.ur5fu.mongodb.net/smartranking?retryWrites=true&w=majority&appName=Cluster0',
    ),
    PlayersModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class AppModule {}
