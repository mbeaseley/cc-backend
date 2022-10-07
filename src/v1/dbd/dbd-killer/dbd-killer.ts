import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

type KillerItemType = 'killer' | 'perk' | 'offering';

type killerItemRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'very rare'
  | 'ultra rare'
  | null;

type KillerAddon = {
  name: string;
  rarity: killerItemRarity;
};

@Schema()
class DbdKillerDocument {
  @Prop()
  type: KillerItemType;

  @Prop()
  name: string;

  @Prop()
  rarity: killerItemRarity;

  @Prop()
  image: string;

  @Prop()
  addons: KillerAddon[] | null;
}

export type DbdKiller = DbdKillerDocument & Document;

export const DbdKillerSchema = SchemaFactory.createForClass(DbdKillerDocument);
