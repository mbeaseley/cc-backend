import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamerSchema } from './streamer';
import { StreamerController } from './streamer.controller';
import { StreamerRepository } from './streamer.repository';

@Module({
  controllers: [StreamerController],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'streamer',
        schema: StreamerSchema,
      },
    ]),
  ],
  providers: [StreamerRepository],
})
export class StreamerModule {}
