import { Test, TestingModule } from '@nestjs/testing';
import { ProductUseCase } from './product.usecase';
import { ProductOutputRepository } from '../../application/repository/product-repository.service';
import { VectorService } from '../../../../shared/services/vector.service';
import { SaveProductDto } from '../dto/save-product-dto';
import { GetProductMatchesDto } from '../dto';
import { ApiError } from '../../../../configuration/helpers';

describe('ProductUseCase', () => {
    let useCase: ProductUseCase;
    let productOutputMock: jest.Mocked<ProductOutputRepository>;
    let vectorServiceMock: jest.Mocked<VectorService>;

    beforeEach(async () => {
        productOutputMock = {
            createMany: jest.fn(),
            getProductMatchesById: jest.fn(),
        } as unknown as jest.Mocked<ProductOutputRepository>;

        vectorServiceMock = {
            generateVectors: jest.fn(),
        } as unknown as jest.Mocked<VectorService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductUseCase,
                { provide: ProductOutputRepository, useValue: productOutputMock },
                { provide: VectorService, useValue: vectorServiceMock },
            ],
        }).compile();

        useCase = module.get<ProductUseCase>(ProductUseCase);
    });

    describe('saveProducts', () => {
        it('should throw an error if no products are provided', async () => {
            const dto: SaveProductDto = { products: [] };

            await expect(useCase.saveProducts(dto)).rejects.toThrowError('No products provided');
        });

        it('should process products in batches and save them', async () => {
            const dto: SaveProductDto = {
                products: Array(300).fill({ id: 1, name: 'Product' }),
            };

            vectorServiceMock.generateVectors.mockResolvedValueOnce(Array(150).fill({ vector: [1, 2, 3] }));
            vectorServiceMock.generateVectors.mockResolvedValueOnce(Array(150).fill({ vector: [4, 5, 6] }));

            await useCase.saveProducts(dto);

            expect(vectorServiceMock.generateVectors).toHaveBeenCalledTimes(2);
            expect(productOutputMock.createMany).toHaveBeenCalledTimes(2);
            expect(productOutputMock.createMany).toHaveBeenCalledWith(expect.any(Array));
        });

        it('should log an error and rethrow if vector generation fails', async () => {
            const dto: SaveProductDto = {
                products: Array(150).fill({ id: 1, name: 'Product' }),
            };

            vectorServiceMock.generateVectors.mockRejectedValueOnce(new Error('Vector generation failed'));

            await expect(useCase.saveProducts(dto)).rejects.toThrowError('Vector generation failed');
            expect(vectorServiceMock.generateVectors).toHaveBeenCalledTimes(1);
        });
    });

    describe('getProductsMatchesById', () => {
        it('should throw an error if no productId is provided', async () => {
            const dto: GetProductMatchesDto = { productId: null } as any;

            await expect(useCase.getProductsMatchesById(dto)).rejects.toThrowError(
                new ApiError(400, 'No productId provided'),
            );
        });

        it('should return product matches', async () => {
            const dto: GetProductMatchesDto = { productId: '123' };

            productOutputMock.getProductMatchesById.mockResolvedValueOnce({
                matches: [
                    { id: '1', score: 0.95 },
                    { id: '2', score: 0.85 },
                ],
            } as any);

            const result = await useCase.getProductsMatchesById(dto);

            expect(productOutputMock.getProductMatchesById).toHaveBeenCalledWith('123');
            expect(result).toEqual({
                recommendations: [
                    { productId: '1', score: 0.95 },
                    { productId: '2', score: 0.85 },
                ],
            });
        });

        it('should log an error and rethrow if product retrieval fails', async () => {
            const dto: GetProductMatchesDto = { productId: '123' };

            productOutputMock.getProductMatchesById.mockRejectedValueOnce(new Error('Database error'));

            await expect(useCase.getProductsMatchesById(dto)).rejects.toThrowError(new ApiError(500, 'Database error'));
            expect(productOutputMock.getProductMatchesById).toHaveBeenCalledTimes(1);
        });
    });
});
