import { SaveProductDto } from '../../application/dto/save-product-dto';
import { GetProductMatchesDto, GetProductMatchesResponseDto } from '../../application/dto/get-product-matches-dto';

export abstract class ProductInputUseCase {
    abstract saveProducts(dto: SaveProductDto): Promise<void>;
    abstract getProductsMatchesById(id: GetProductMatchesDto): Promise<GetProductMatchesResponseDto>;
}
