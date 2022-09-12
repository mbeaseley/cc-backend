import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './v1/config/config.module';
import { StreamerModule } from './v1/streamer/streamer.module';
import { RulesModule } from './v1/rules/rules.module';

@Module({
  imports: [
    AppConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
    RouterModule.register([
      {
        path: 'v1/config',
        module: ConfigModule,
      },
      {
        path: 'v1/guild-rules',
        module: RulesModule,
      },
      {
        path: 'v1/twitch-streamers',
        module: StreamerModule,
      },
    ]),
    ConfigModule,
    RulesModule,
    StreamerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
