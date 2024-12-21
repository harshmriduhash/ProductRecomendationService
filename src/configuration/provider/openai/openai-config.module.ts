import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OpenaiConfigService } from './openai-config.service';

import configuration from './openai-config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
    ],
    providers: [ConfigService, OpenaiConfigService],
    exports: [OpenaiConfigService],
})
export class OpenaiConfigModule {}
