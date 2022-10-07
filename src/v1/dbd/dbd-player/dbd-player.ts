import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface Killers {
  [key: string]: boolean;
}

@Schema()
class DbdPlayerDocument {
  @Prop()
  discordUserId: string;

  @Prop({ type: 'Object' })
  killers: Killers;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export type DbdPlayer = DbdPlayerDocument & Document;

export const DBdPlayerSchema = SchemaFactory.createForClass(DbdPlayerDocument);
