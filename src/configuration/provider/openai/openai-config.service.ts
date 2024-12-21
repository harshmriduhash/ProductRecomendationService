import { AllConfig } from '../../../configuration/configuraton.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiConfigService {
    constructor(private configService: ConfigService<AllConfig>) {}

    public get apiKey(): string {
        return this.configService.getOrThrow('openai-provider.apiKey', { infer: true });
    }
}
