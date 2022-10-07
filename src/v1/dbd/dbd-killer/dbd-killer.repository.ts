import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbdKiller } from './dbd-killer';

@Injectable()
export class DbdKillerRepository {
  constructor(
    @InjectModel('dbdKiller')
    private readonly _dbdKillerModel: Model<DbdKiller>,
  ) {}

  /**
   * Get all killers
   * @returns {Promise<DbdKiller[]>}
   */
  async getAllKillers(): Promise<DbdKiller[]> {
    return await this._dbdKillerModel.find({ type: 'killer' });
  }

  /**
   * Get Killer, either random or via name
   * @param {string} (Optional)
   * @returns {Promise<DbdKiller>}
   */
  async getKiller(name?: string): Promise<DbdKiller> {
    if (name) {
      return await this._dbdKillerModel.findOne({ name });
    }

    const perks = await this._dbdKillerModel.aggregate([
      { $match: { type: 'killer' } },
      { $sample: { size: 1 } },
    ]);
    return perks[0];
  }

  /**
   * Get all killer perks
   * @returns {Promise<DbdKiller[]>}
   */
  async getAllKillerPerks(): Promise<DbdKiller[]> {
    return await this._dbdKillerModel.find({ type: 'perk' });
  }

  /**
   * Get 4 random perks
   * @returns {Promise<DbdKiller[]>}
   */
  async getPerks(): Promise<DbdKiller[]> {
    return await this._dbdKillerModel.aggregate([
      { $match: { type: 'perk' } },
      { $sample: { size: 4 } },
    ]);
  }

  /**
   * Get all killer offerings
   * @returns {Promise<DbdKiller[]>}
   */
  async getAllKillerOfferings(): Promise<DbdKiller[]> {
    return await this._dbdKillerModel.find({ type: 'offering' });
  }

  /**
   * Get random offering
   * @returns {Promise<DbdKiller>}
   */
  async getOffering(): Promise<DbdKiller> {
    const offering = await this._dbdKillerModel.aggregate([
      { $match: { type: 'offering' } },
      { $match: { size: 1 } },
    ]);
    return offering[0];
  }
}
