import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class RulesDocument {
  @Prop()
  discordGuildId: string;

  @Prop()
  content: RuleItem[];

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export type Rules = RulesDocument & Document;

export const RulesSchema = SchemaFactory.createForClass(RulesDocument);

export class RuleItem {
  copy: string;
  type: string;
}

export class RulesPayload {
  discordGuildId: string;
  content: RuleItem[];
}
