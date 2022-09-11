import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigSchema } from './config';
import { ConfigController } from './config.controller';
import { ConfigRepository } from './config.repository';

@Module({
  controllers: [ConfigController],
  exports: [],
  imports: [
    MongooseModule.forFeature([{ name: 'config', schema: ConfigSchema }]),
  ],
  providers: [ConfigRepository],
})
export class ConfigModule {}
