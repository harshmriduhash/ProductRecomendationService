import { Injectable, Logger } from '@nestjs/common';
import { PineconeRecord, RecordMetadata, QueryResponse } from '@pinecone-database/pinecone';
import { ProductRepository } from '../../domain/ports/product.output.usecase';
import { VectorDatabase } from '../../../../providers/database/pinecone/pinecone-interface';

@Injectable()
export class ProductOutputRepository implements ProductRepository {
    readonly logger = new Logger(ProductOutputRepository.name);

    constructor(private readonly vectorDb: VectorDatabase) {}

    async createMany(vectors: PineconeRecord<RecordMetadata>[] | any): Promise<void> {
        this.logger.log(`Saving ${vectors.length} vectors as products`);

        try {
            await this.vectorDb.createMany(vectors);
        } catch (error: Error | any) {
            this.logger.error(`Error saving vectors in batch: ${error.message}`, error.stack);
            throw error;
        }
    }

    async getProductMatchesById(id: string): Promise<QueryResponse> {
        const topK = parseInt(process.env.PINECONE_TOP_K || '5', 10);

        try {
            return await this.vectorDb.query({ id, topK });
        } catch (error: Error | any) {
            this.logger.error(`Error querying product matches: ${error.message}`, error.stack);
            throw error;
        }
    }
}
