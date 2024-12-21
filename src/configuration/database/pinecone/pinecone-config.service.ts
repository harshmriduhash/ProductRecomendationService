import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from '../../configuraton.type';

@Injectable()
export class PineconeConfigService {
    constructor(private configService: ConfigService<AllConfig>) {}

    public get apiKey(): string | undefined {
        return this.configService.get('pinecone-database.apiKey', { infer: true });
    }
}
