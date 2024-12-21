import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PineconeConfigService } from './pinecone-config.service';
import pineconeConfig from './pinecone-config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [pineconeConfig],
        }),
    ],
    providers: [ConfigService, PineconeConfigService],
    exports: [PineconeConfigService],
})
export class PineconeConfigModule {}
