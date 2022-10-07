import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { DbdPlayer } from './dbd-player';
import { DbdPlayerRepository } from './dbd-player.repository';

@Controller()
export class DbdPlayerController {
  constructor(private readonly _dbdPlayerRepository: DbdPlayerRepository) {}

  /**
   * Get all players killer information
   * @returns {Promise<DbdPlayer[]>}
   */
  @Get('/player')
  async get(): Promise<DbdPlayer[]> {
    return await this._dbdPlayerRepository.get();
  }

  /**
   * Get player killer information
   * @param {string} userId
   * @returns {Promise<DbdPlayer>}
   */
  @Get('/player/:userId')
  async getByUserId(@Param('userId') userId: string): Promise<DbdPlayer> {
    if (!userId) {
      throw new BadRequestException(`User with ID must be passed in request.`);
    }

    return await this._dbdPlayerRepository.getByUserId(userId);
  }
}
