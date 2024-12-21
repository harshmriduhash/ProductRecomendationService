import { Module } from '@nestjs/common';
import { PineconeDatabaseProviderModule } from '../../providers/database/pinecone/pinecone-database-provider.module';
import { PineconeRepository } from './pinecone-repository.service';

@Module({
    imports: [PineconeDatabaseProviderModule],
    providers: [PineconeRepository],
    exports: [PineconeRepository],
})
export class PineconeRepositoryModule {}
