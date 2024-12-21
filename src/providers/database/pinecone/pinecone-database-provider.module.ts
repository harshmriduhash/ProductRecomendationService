import { PineconeConfigService } from '../../../configuration/database/pinecone/pinecone-config.service';
import { PineconeConfigModule } from '../../../configuration/database/pinecone/pinecone-config.module';
import { Module } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

@Module({
    imports: [PineconeConfigModule],
    providers: [
        {
            provide: 'PINECONE_CLIENT',
            inject: [PineconeConfigService],
            useFactory: async (dbConfigService: PineconeConfigService) => {
                const client = new Pinecone({
                    apiKey: dbConfigService.apiKey as string,
                });
                return client;
            },
        },
    ],
    exports: ['PINECONE_CLIENT'],
})
export class PineconeDatabaseProviderModule {}
