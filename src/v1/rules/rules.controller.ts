import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { Rules, RulesPayload } from './rules';
import { RulesRepository } from './rules.repository';

@Controller()
export class RulesController {
  constructor(private readonly _rulesRepository: RulesRepository) {}

  @Get()
  async get(@Query('guildId') guildId: string): Promise<Rules> {
    if (!guildId) {
      throw new BadRequestException('No discord guild id was provided.');
    }

    return await this._rulesRepository.get(guildId);
  }

  @Post()
  async create(@Body() payload: RulesPayload): Promise<Rules> {
    if (!payload.discordGuildId) {
      throw new BadRequestException('No discord guild id was provided.');
    }

    return await this._rulesRepository.create(payload);
  }
}
