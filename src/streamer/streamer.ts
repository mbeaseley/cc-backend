import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class StreamerDocument {
  @Prop()
  username: string;

  @Prop()
  discordUserId: string;

  @Prop()
  discordGuildIds: string[];

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export type Streamer = StreamerDocument & Document;

export const StreamerSchema = SchemaFactory.createForClass(StreamerDocument);

export class StreamerPayload {
  username: string;
  discordUserId?: string;
  discordGuildIds?: string[];
}
