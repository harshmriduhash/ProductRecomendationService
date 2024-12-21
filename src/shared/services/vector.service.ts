import { Injectable } from '@nestjs/common';
import { EmbeddingService } from '../../providers/openai/openai-interface';
import { Product } from '../../modules/product/domain/entity/product-entity';
import { RetryService } from './retry.service';

@Injectable()
export class VectorService {
    constructor(
        private readonly embeddingService: EmbeddingService,
        private readonly retryService: RetryService,
    ) {}

    async generateVectors(products: Product[]): Promise<any[]> {
        const pLimit = (await import('p-limit')).default;

        const vectors: any[] = [];

        const maxConcurrency = Math.min(10, Math.floor(products.length / 10));
        const concurrency = maxConcurrency > 0 ? maxConcurrency : 2;
        const limit = pLimit(concurrency);

        const batchVectors = await Promise.all(
            products.map((product) => limit(async () => await this.generateVector(product))),
        );

        vectors.push(...batchVectors);

        return vectors;
    }

    async generateVector(product: Product): Promise<any> {
        const tagsText = product.tags.join(' ');

        const embedding = await this.retryService.retryWithTimeout(
            () => this.embeddingService.generateEmbedding(tagsText),
            3000,
            3,
        );

        return {
            id: product.id,
            values: embedding,
            metadata: {
                id: product.id,
                name: product.name,
                tags: product.tags,
                description: product.description,
            },
        };
    }
}
