import { Module } from '@nestjs/common';
import configuration from './app-config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
