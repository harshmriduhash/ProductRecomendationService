import { Injectable, Logger } from '@nestjs/common';
import { ApiError } from '../../../../configuration/helpers';
import { ProductOutputRepository } from '../../application/repository/product-repository.service';
import { ProductInputUseCase } from '../../domain/ports/product.input.usecase';
import { SaveProductDto } from '../dto/save-product-dto';
import { GetProductMatchesDto, GetProductMatchesResponseDto } from '../dto';
import { VectorService } from '../../../../shared/services/vector.service';

@Injectable()
export class ProductUseCase implements ProductInputUseCase {
    readonly logger = new Logger(ProductUseCase.name);

    constructor(
        private readonly productOutput: ProductOutputRepository,
        private readonly vectorService: VectorService,
    ) {}

    async saveProducts(dto: SaveProductDto): Promise<void> {
        const products = dto.products;

        if (!products || products.length === 0) {
            throw new Error('No products provided');
        }

        const generatedProducts = [];

        this.logger.log(`Generated vectors for ${products.length} products`);

        for (let i = 0; i < products.length; i += 150) {
            const batch = products.slice(i, i + 150);
            try {
                const vectors = await this.vectorService.generateVectors(batch as any);
                generatedProducts.push(...vectors);
                await this.productOutput.createMany(vectors);
                this.logger.log(`Vectors generated already ${vectors.length}`);
            } catch (error: Error | any) {
                this.logger.error(`Error generating embeddings and save vectors: ${error.message}`, error.stack);
                throw error;
            }
        }

        this.logger.log(`Generated vectors for ${generatedProducts.length} products`);
    }

    async getProductsMatchesById(dto: GetProductMatchesDto): Promise<GetProductMatchesResponseDto> {
        if (!dto || !dto.productId) {
            throw new ApiError(400, 'No productId provided');
        }

        try {
            const response = await this.productOutput.getProductMatchesById(dto.productId);

            this.logger.log(`GetProductMatchesById: ${JSON.stringify(response)}`);

            const products = response.matches.map((match) => {
                return {
                    productId: match.id,
                    score: match.score,
                };
            });

            return { recommendations: products as any };
        } catch (error: Error | any) {
            this.logger.error(`GetProductsMatchesError: ${error.message}`);
            throw new ApiError(500, error.message);
        }
    }
}
