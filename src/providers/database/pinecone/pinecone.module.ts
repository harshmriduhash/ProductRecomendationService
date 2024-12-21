import { Module } from '@nestjs/common';
import { PineconeDatabaseProviderModule } from './pinecone-database-provider.module';

@Module({
    imports: [PineconeDatabaseProviderModule],
})
export class PineconeModule {}
