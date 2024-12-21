import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../helpers/validate-config';
import { DbConfig } from './pinecone-config.type';

class EnvVariablesValidator {
    @IsOptional()
    @IsString()
    apiKey: string;
}

export default registerAs<DbConfig>('pinecone-database', () => {
    validateConfig(process.env, EnvVariablesValidator);

    return {
        apiKey: process.env.PINECONEAPI_KEY!,
    };
});
