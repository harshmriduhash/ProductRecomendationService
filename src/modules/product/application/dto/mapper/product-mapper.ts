import { Product } from '../../../domain/entity/product-entity';
import { SaveProductDto } from '../save-product-dto';

export class ProductMapper {
    public static saveProductsToProducts(dto: SaveProductDto): Product[] {
        const products = dto.products.map((product) => {
            const newProduct = new Product(product.id, product.name, product.description, product.tags);
            newProduct.validate();
            return newProduct;
        });

        return products;
    }
}
