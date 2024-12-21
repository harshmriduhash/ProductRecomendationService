import { Module } from '@nestjs/common';
import { RetryService } from './services/retry.service';
import { VectorService } from './services/vector.service';
import { EmbeddingService } from '../providers/openai/openai-interface';
import { OpenaiService } from '../providers/openai/openai.service';
import { OpenaiModule } from '../providers/openai/openai.module';
import { OpenaiConfigModule } from '../configuration/provider/openai/openai-config.module';

@Module({
    imports: [OpenaiModule, OpenaiConfigModule],
    providers: [
        RetryService,
        VectorService,
        {
            provide: EmbeddingService,
            useClass: OpenaiService,
        },
    ],
    exports: [RetryService, VectorService, EmbeddingService],
})
export class SharedModule {}
