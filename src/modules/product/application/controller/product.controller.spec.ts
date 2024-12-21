import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductUseCase } from '../use-case/product.usecase';
import { SaveProductDto } from '../dto/save-product-dto';

describe('ProductController', () => {
    let productController: ProductController;
    let productUseCaseMock: ProductUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductUseCase,
                    useValue: {
                        saveProducts: jest.fn(),
                        getProductsMatchesById: jest.fn(),
                    },
                },
            ],
        }).compile();

        productController = module.get<ProductController>(ProductController);
        productUseCaseMock = module.get<ProductUseCase>(ProductUseCase);
    });

    describe('saveProducts', () => {
        it('should save products successfully', async () => {
            const saveProductDto: SaveProductDto = {
                products: [
                    {
                        id: '1',
                        name: 'Product 1',
                        description: 'Description 1',
                        tags: ['tag1', 'tag2'],
                    },
                ],
            };

            // Mock the use case method
            jest.spyOn(productUseCaseMock, 'saveProducts').mockResolvedValue(undefined);

            const response = await productController.saveProducts(saveProductDto);

            expect(productUseCaseMock.saveProducts).toHaveBeenCalledWith(saveProductDto);
            expect(response).toEqual({
                message: 'Products saved successfully',
            });
        });

        it('should return a generic error response for unexpected errors', async () => {
            const saveProductDto: SaveProductDto = {
                products: [
                    {
                        id: '1',
                        name: 'Product 1',
                        description: 'Description 1',
                        tags: ['tag1', 'tag2'],
                    },
                ],
            };

            // Mock the use case to throw a generic error
            jest.spyOn(productUseCaseMock, 'saveProducts').mockRejectedValue(new Error('Unexpected error'));

            const response = await productController.saveProducts(saveProductDto);

            expect(productUseCaseMock.saveProducts).toHaveBeenCalledWith(saveProductDto);
            expect(response).toEqual({
                error: 'Unexpected error',
            });
        });
    });

    describe('getProductsMatchesById', () => {
        it('should return product matches successfully', async () => {
            const productId = '1';

            // Mock the use case method
            jest.spyOn(productUseCaseMock, 'getProductsMatchesById').mockResolvedValue({
                recommendations: [
                    { productId: '1', score: 1.0 },
                    { productId: '2', score: 0.9 },
                ] as any,
            });

            const response = await productController.getProductsMatchesById(productId);

            expect(productUseCaseMock.getProductsMatchesById).toHaveBeenCalledWith({ productId });
            expect(response).toEqual({
                recommendations: [
                    { productId: '1', score: 1.0 },
                    { productId: '2', score: 0.9 },
                ],
            });
        });

        it('should return a generic error response for unexpected errors', async () => {
            const productId = '1';

            // Mock the use case to throw a generic error
            jest.spyOn(productUseCaseMock, 'getProductsMatchesById').mockRejectedValue(new Error('Unexpected error'));

            const response = await productController.getProductsMatchesById(productId);

            expect(productUseCaseMock.getProductsMatchesById).toHaveBeenCalledWith({ productId });
            expect(response).toEqual({
                error: 'Unexpected error',
            });
        });
    });
});
