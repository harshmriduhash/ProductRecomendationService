import { AppConfig } from './app/app-config.type';
import { DbConfig } from './database/pinecone';
import { OpenaiConfig } from './provider';

export type AllConfig = {
    app: AppConfig;
    'pinecone-database': DbConfig;
    'openai-provider': OpenaiConfig;
};
