import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamerModule } from './streamer/streamer.module';

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
        path: 'twitch-streamers',
        module: StreamerModule,
      },
    ]),
    StreamerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
