import { registerAs } from '@nestjs/config';
import { AppConfig, ENVIRONMENT, LOG_LEVEL } from './app-config.type';

import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import validateConfig from '../helpers/validate-config';

class EnvVariablesValidator {
    @IsOptional()
    @IsString()
    APP_NAME: string;

    @IsEnum(ENVIRONMENT)
    @IsOptional()
    NODE_ENV: ENVIRONMENT;

    @IsOptional()
    @IsString()
    APP_URL: string;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    APP_PORT: number;

    @IsEnum(LOG_LEVEL)
    @IsOptional()
    APP_LOG_LEVEL: LOG_LEVEL;

    @IsOptional()
    @IsString()
    API_PREFIX: string;
}

export default registerAs<AppConfig>('app', () => {
    const env = {
        nodeEnv: process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT,
        name: process.env.APP_NAME || 'MyApp',
        url: process.env.APP_URL || 'http://my-app.test',
        port: Number(process.env.APP_PORT) || 3000,
        logLevel: process.env.APP_LOG_LEVEL || LOG_LEVEL.INFO,
        apiPrefix: process.env.API_PREFIX || 'api',
    };

    validateConfig(env, EnvVariablesValidator);

    return env;
});
