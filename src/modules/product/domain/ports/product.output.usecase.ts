import { QueryResponse } from '@pinecone-database/pinecone';
import { Product } from '../../domain/entity/product-entity';
import { IRepository } from '../../../../repositories/repository-interface';

export interface ProductRepository extends IRepository<Product> {
    getProductMatchesById(id: string): Promise<QueryResponse>;
}
