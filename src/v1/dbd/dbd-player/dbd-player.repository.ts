import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbdPlayer } from './dbd-player';

@Injectable()
export class DbdPlayerRepository {
  constructor(
    @InjectModel('dbdPlayer')
    private readonly _dbdPlayerModel: Model<DbdPlayer>,
  ) {}

  /**
   * Get all players killer information
   * @returns {Promise<DbdPlayer[]>}
   */
  async get(): Promise<DbdPlayer[]> {
    return await this._dbdPlayerModel.find();
  }

  /**
   * Get player killer information
   * @param {string} discordUserId
   * @returns {Promise<DbdPlayer>}
   */
  async getByUserId(discordUserId: string): Promise<DbdPlayer> {
    return await this._dbdPlayerModel.findOne({ discordUserId });
  }

  /**
   * Update player killers
   * @param {DbdPlayer}
   * @returns {DbdPlayer}
   */
  async updatePlayer({
    discordUserId,
    killers,
  }: DbdPlayer): Promise<DbdPlayer> {
    const existingPlayer = await this.getByUserId(discordUserId);
    if (!existingPlayer) {
      throw new BadRequestException(
        `User with ID ${discordUserId} doesn't exists`,
      );
    }

    const updatedAt = new Date().toISOString();

    await this._dbdPlayerModel.updateOne({ discordUserId, killers, updatedAt });
    return this.getByUserId(discordUserId);
  }
}
