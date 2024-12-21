import { OpenaiConfigService } from '../../configuration/provider/openai/openai-config.service';
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    private readonly logger = new Logger(OpenaiConfigService.name);

    #openai: OpenAI;

    constructor(private configuration: OpenaiConfigService) {
        this.#openai = this.initOpenai({
            apiKey: this.configuration.apiKey,
        });
    }

    private initOpenai(configuration: any): OpenAI {
        return new OpenAI(configuration);
    }

    async generateEmbedding(text: string): Promise<number[]> {
        try {
            const response = await this.#openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: text,
            });

            return response.data[0].embedding;
        } catch (error) {
            this.logger.error(error);
            throw new Error('Error generating embedding');
        }
    }
}
