import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// * Dbd player
import { DBdPlayerSchema } from './dbd-player/dbd-player';
import { DbdPlayerController } from './dbd-player/dbd-player.controller';
import { DbdPlayerRepository } from './dbd-player/dbd-player.repository';

// * Dbd Killer
import { DbdKillerSchema } from './dbd-killer/dbd-killer';
import { DbdKillerController } from './dbd-killer/dbd-killer.controller';
import { DbdKillerRepository } from './dbd-killer/dbd-killer.repository';

// * Dbd Survivor

@Module({
  controllers: [DbdPlayerController, DbdKillerController],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'dbdPlayer',
        schema: DBdPlayerSchema,
        collection: 'dbdPlayers',
      },
      { name: 'dbdKiller', schema: DbdKillerSchema, collection: 'dbdKillers' },
    ]),
  ],
  providers: [DbdPlayerRepository, DbdKillerRepository],
})
export class DbdModule {}
