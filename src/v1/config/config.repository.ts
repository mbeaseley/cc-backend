import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from './config';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectModel('config')
    private readonly _configModel: Model<Config>,
  ) {}

  /**
   * Get all configs or guild id relevant config
   * @param {string}
   * @returns {Promise<Config | Config[]>}
   */
  async get(guildId?: string): Promise<Config | Config[]> {
    if (!guildId) {
      return await this._configModel.find();
    }

    return await this._configModel.findOne();
  }
}
