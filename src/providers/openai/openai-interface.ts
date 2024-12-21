export abstract class EmbeddingService {
    abstract generateEmbedding(text: string): Promise<number[]>;
}
