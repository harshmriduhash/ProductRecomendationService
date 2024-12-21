import { PineconeRecord, RecordMetadata, QueryOptions, QueryResponse } from '@pinecone-database/pinecone';

export abstract class VectorDatabase {
    abstract createMany(vectors: PineconeRecord<RecordMetadata>[]): Promise<void>;
    abstract query(queryOptions: QueryOptions): Promise<QueryResponse>;
}
