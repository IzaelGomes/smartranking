import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://izaelgomes127:0p1r4USlUVhenNRL@cluster0.ur5fu.mongodb.net/smartranking?retryWrites=true&w=majority&appName=Cluster0',
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
