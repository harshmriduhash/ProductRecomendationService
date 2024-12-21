import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { VectorDatabase } from '../../../../providers/database/pinecone/pinecone-interface';
import { PineconeRecord, RecordMetadata, QueryResponse } from '@pinecone-database/pinecone';
import { ProductOutputRepository } from './product-repository.service';

describe('ProductOutputRepository', () => {
    let repository: ProductOutputRepository;
    let vectorDbMock: jest.Mocked<VectorDatabase>;
    const loggerMock = new Logger(ProductOutputRepository.name);

    beforeEach(async () => {
        vectorDbMock = {
            createMany: jest.fn(),
            query: jest.fn(),
        } as unknown as jest.Mocked<VectorDatabase>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductOutputRepository,
                { provide: VectorDatabase, useValue: vectorDbMock },
                { provide: Logger, useValue: loggerMock },
            ],
        }).compile();

        repository = module.get<ProductOutputRepository>(ProductOutputRepository);
    });

    describe('createMany', () => {
        it('should save vectors using VectorDatabase', async () => {
            const vectors: PineconeRecord<RecordMetadata>[] = [
                { id: '1', values: [0.1, 0.2], metadata: { key: 'value' } },
                { id: '2', values: [0.3, 0.4], metadata: { key: 'value2' } },
            ];

            vectorDbMock.createMany.mockResolvedValue(undefined);

            await repository.createMany(vectors);

            expect(vectorDbMock.createMany).toHaveBeenCalledTimes(1);
            expect(vectorDbMock.createMany).toHaveBeenCalledWith(vectors);
        });

        it('should log an error and rethrow if createMany fails', async () => {
            const vectors: PineconeRecord<RecordMetadata>[] = [
                { id: '1', values: [0.1, 0.2], metadata: { key: 'value' } },
            ];

            const error = new Error('Vector database error');
            vectorDbMock.createMany.mockRejectedValueOnce(error);

            await expect(repository.createMany(vectors)).rejects.toThrowError('Vector database error');
            expect(vectorDbMock.createMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('getProductMatchesById', () => {
        it('should query product matches from VectorDatabase', async () => {
            const id = '123';
            const topK = 5;
            process.env.PINECONE_TOP_K = `${topK}`;

            const queryResponse: QueryResponse = {
                matches: [
                    { id: '1', score: 0.9 },
                    { id: '2', score: 0.8 },
                ],
            } as any;

            vectorDbMock.query.mockResolvedValue(queryResponse);

            const result = await repository.getProductMatchesById(id);

            expect(vectorDbMock.query).toHaveBeenCalledTimes(1);
            expect(vectorDbMock.query).toHaveBeenCalledWith({ id, topK });
            expect(result).toEqual(queryResponse);
        });

        it('should log an error and rethrow if query fails', async () => {
            const id = '123';
            const error = new Error('Query error');

            vectorDbMock.query.mockRejectedValueOnce(error);

            await expect(repository.getProductMatchesById(id)).rejects.toThrowError('Query error');
            expect(vectorDbMock.query).toHaveBeenCalledTimes(1);
        });
    });
});
