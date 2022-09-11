import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class ConfigDocument {
  @Prop()
  discordGuildId: string;
}

export type Config = ConfigDocument & Document;

export const ConfigSchema = SchemaFactory.createForClass(ConfigDocument);
