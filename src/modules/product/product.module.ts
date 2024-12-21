import { Module } from '@nestjs/common';
import { OpenaiModule } from '../../providers/openai/openai.module';
import { PineconeRepositoryModule } from '../../repositories/pinecone/pinecone-repository.module';
import { ProductController } from './application/controller/product.controller';
import { ProductOutputRepository } from './application/repository/product-repository.service';
import { ProductUseCase } from '../product/application/use-case/product.usecase';
import { VectorDatabase } from '../../providers/database/pinecone/pinecone-interface';
import { PineconeRepository } from '../../repositories/pinecone/pinecone-repository.service';
import { OpenaiConfigModule } from 'src/configuration';
import { PineconeConfigModule } from 'src/configuration/database/pinecone/pinecone-config.module';
import { PineconeDatabaseProviderModule } from 'src/providers';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [
        PineconeDatabaseProviderModule,
        SharedModule,
        OpenaiConfigModule,
        PineconeConfigModule,
        PineconeRepositoryModule,
        OpenaiModule,
    ],
    controllers: [ProductController],
    providers: [
        ProductUseCase,
        ProductOutputRepository,
        {
            provide: VectorDatabase,
            useClass: PineconeRepository,
        },
    ],
})
export class ProductModule {}
