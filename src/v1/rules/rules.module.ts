import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RulesSchema } from './rules';
import { RulesController } from './rules.controller';
import { RulesRepository } from './rules.repository';

@Module({
  controllers: [RulesController],
  exports: [],
  imports: [
    MongooseModule.forFeature([{ name: 'rules', schema: RulesSchema }]),
  ],
  providers: [RulesRepository],
})
export class RulesModule {}
