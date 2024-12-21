import { Module } from '@nestjs/common';
import { OpenaiConfigModule } from '../openai/../../configuration/provider/openai/openai-config.module';
import { OpenaiService } from './openai.service';

@Module({
    imports: [OpenaiConfigModule],
    providers: [OpenaiService],
    exports: [OpenaiService],
})
export class OpenaiModule {}
