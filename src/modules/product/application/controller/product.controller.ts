import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductUseCase } from '../use-case/product.usecase';
import { SaveProductDto } from '../dto/save-product-dto';
import { ApiError } from '../../../../configuration/helpers/api-error';

@Controller('product')
export class ProductController {
    constructor(private readonly productUseCase: ProductUseCase) {}

    @Post()
    async saveProducts(@Body() body: SaveProductDto): Promise<any> {
        try {
            await this.productUseCase.saveProducts(body);
            return {
                message: 'Products saved successfully',
            };
        } catch (error: Error | ApiError | any) {
            if (error instanceof ApiError) {
                return {
                    error: error.message,
                    code: error.code,
                };
            }

            return { error: error.message };
        }
    }

    @Get(':id')
    async getProductsMatchesById(@Param('id') productId: string): Promise<any> {
        try {
            const response = await this.productUseCase.getProductsMatchesById({
                productId,
            });
            return response;
        } catch (error: Error | ApiError | any) {
            if (error instanceof ApiError) {
                return {
                    error: error.message,
                    code: error.code,
                };
            }

            return { error: error.message };
        }
    }
}
