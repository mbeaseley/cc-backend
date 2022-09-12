import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rules, RulesPayload } from './rules';

@Injectable()
export class RulesRepository {
  constructor(
    @InjectModel('rules')
    private readonly _rulesModel: Model<Rules>,
  ) {}

  async get(discordGuildId: string): Promise<Rules> {
    const existingRules = await this._rulesModel.findOne({ discordGuildId });
    console.log(existingRules);
    if (!existingRules) {
      throw new BadRequestException(
        `Discord Guild ID ${discordGuildId} already exists.`,
      );
    }

    return existingRules;
  }

  async create({ discordGuildId, content }: RulesPayload): Promise<Rules> {
    const existingRules = await this._rulesModel.findOne({ discordGuildId });
    if (existingRules) {
      throw new BadRequestException(
        `Discord Guild ID ${discordGuildId} already exists.`,
      );
    }

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    return await this._rulesModel.create({
      discordGuildId,
      content,
      createdAt,
      updatedAt,
    });
  }
}
