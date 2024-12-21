import { registerAs } from '@nestjs/config';
import { IsOptional } from 'class-validator';
import { OpenaiConfig } from './openai-config.type';
import validateConfig from '../../../configuration/helpers/validate-config';

class EnvVariablesValidator {
    @IsOptional()
    apiKey: string;
}

export default registerAs<OpenaiConfig>('openai-provider', () => {
    validateConfig(process.env, EnvVariablesValidator);
    return {
        apiKey: process.env.OPENAI_API_KEY!,
    };
});
