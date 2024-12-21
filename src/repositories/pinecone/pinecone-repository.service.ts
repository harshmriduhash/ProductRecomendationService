import { Injectable, Inject } from '@nestjs/common';
import { Pinecone, PineconeRecord, RecordMetadata, QueryOptions, QueryResponse } from '@pinecone-database/pinecone';
import { IRepository } from '..';

@Injectable()
export class PineconeRepository implements IRepository<PineconeRecord<RecordMetadata>> {
    private index = this.pinecone.index(String(process.env.PINECONE_INDEX));

    constructor(@Inject('PINECONE_CLIENT') private readonly pinecone: Pinecone) {}

    async createMany(upsert: PineconeRecord<RecordMetadata>[]): Promise<void> {
        await this.index.upsert(upsert);
    }

    async query(query: QueryOptions): Promise<QueryResponse> {
        return await this.index.query(query);
    }
}
