import { Controller, Get, Query } from '@nestjs/common';
import { Config } from './config';
import { ConfigRepository } from './config.repository';

@Controller()
export class ConfigController {
  constructor(private readonly _configRepository: ConfigRepository) {}

  /**
   * Get all configs or guild id relevant config
   * @param {string}
   * @returns {Promise<Config | Config[]>}
   */
  @Get()
  async get(@Query('guildId') guildId: string): Promise<Config | Config[]> {
    return await this._configRepository.get(guildId);
  }
}
