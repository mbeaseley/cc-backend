import { Controller, Get, Query } from '@nestjs/common';
import { DbdKiller } from './dbd-killer';
import { DbdKillerRepository } from './dbd-killer.repository';

@Controller()
export class DbdKillerController {
  constructor(private readonly _dbdKillerRepository: DbdKillerRepository) {}

  /**
   * Get all killers or killer via name or random choice
   * @param {boolean} random
   * @param {string} name
   * @returns {Promise<DbdKiller[]>}
   */
  @Get('/killers')
  async get(
    @Query('random') random: boolean,
    @Query('name') name: string,
  ): Promise<DbdKiller | DbdKiller[]> {
    if (random || name) {
      return await this._dbdKillerRepository.getKiller(name?.toLowerCase());
    }

    return await this._dbdKillerRepository.getAllKillers();
  }

  /**
   * Get killer perks
   * @param {boolean} random
   * @returns {Promise<DbdKiller | DbdKiller[]>}
   */
  @Get('/killer-perks')
  async getAllKillerPerks(
    @Query('random') random: boolean,
  ): Promise<DbdKiller[]> {
    if (random) {
      return await this._dbdKillerRepository.getPerks();
    }

    return await this._dbdKillerRepository.getAllKillerPerks();
  }

  /**
   * Get killer offering or all offerings
   * @param {boolean} random
   * @returns {Promise<DbdKiller | DbdKiller[]>}
   */
  @Get('/killer-offerings')
  async getAllKillerOfferings(
    @Query('random') random: boolean,
  ): Promise<DbdKiller | DbdKiller[]> {
    if (random) {
      return await this._dbdKillerRepository.getOffering();
    }

    return await this._dbdKillerRepository.getAllKillerOfferings();
  }
}
