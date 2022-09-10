import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StreamerPayload, Streamer } from './streamer';

@Injectable()
export class StreamerRepository {
  constructor(
    @InjectModel('streamer')
    private readonly _streamerModel: Model<Streamer>,
  ) {}

  /**
   * Get all streamers
   * @returns {Promise<Streamer[]>}
   */
  async get(): Promise<Streamer[]> {
    return await this._streamerModel.find();
  }

  /**
   * Create streamer
   * @param {StreamerPayload}
   * @returns {Promise<Streamer>}
   */
  async create({
    username,
    discordUserId,
    discordGuildIds,
  }: StreamerPayload): Promise<Streamer> {
    const existingUser = await this._streamerModel.findOne({ username });
    if (existingUser) {
      throw new Error(`User with username "${username}" already exists.`);
    }

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    return await this._streamerModel.create({
      username,
      discordUserId,
      discordGuildIds,
      createdAt,
      updatedAt,
    });
  }

  /**
   * Update streamer
   * @param {StreamerPayload}
   * @returns {Promise<Streamer>}
   */
  async update({
    username,
    discordUserId,
    discordGuildIds,
  }: StreamerPayload): Promise<Streamer> {
    const existingUser = await this._streamerModel.findOne({ username });
    if (!existingUser) {
      throw new Error(`User with username "${username}" doesn't exists.`);
    }

    const updatedAt = new Date().toISOString();

    return await this._streamerModel
      .updateOne(
        { username },
        { username, discordUserId, discordGuildIds, updatedAt },
      )
      .then(() => this._streamerModel.findOne({ username }));
  }
}
