import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { StreamerPayload, Streamer } from './streamer';
import { StreamerRepository } from './streamer.repository';

@Controller()
export class StreamerController {
  constructor(private readonly _streamerRepository: StreamerRepository) {}

  /**
   * Get all streamers
   * @returns {Promise<Streamer[]>}
   */
  @Get()
  async get(): Promise<Streamer[]> {
    return await this._streamerRepository.get();
  }

  /**
   * Create streamer
   * @param {StreamerPayload}
   * @returns {Promise<Streamer>}
   */
  @Post()
  async create(@Body() payload: StreamerPayload): Promise<Streamer> {
    if (!payload.username) {
      throw new BadRequestException('No username was provided.');
    }

    if (!payload.discordUserId) {
      throw new BadRequestException('No discord user id was provided.');
    }

    return await this._streamerRepository.create(payload);
  }

  /**
   * Update streamer
   * @param {StreamerPayload}
   * @returns {Promise<Streamer>}
   */
  @Put()
  async update(@Body() payload: StreamerPayload): Promise<Streamer> {
    if (!payload.username) {
      throw new BadRequestException('No username was provided.');
    }

    return await this._streamerRepository.update(payload);
  }
}
