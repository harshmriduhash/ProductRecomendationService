import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from '../configuraton.type';

/**
 * Service dealing with db config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService<AllConfig>) {}

    public get nodeEnv(): string {
        return this.configService.getOrThrow('app.nodeEnv', { infer: true });
    }

    public get name(): string {
        return this.configService.getOrThrow('app.name', { infer: true });
    }

    public get url(): string {
        return this.configService.getOrThrow('app.url', { infer: true });
    }

    public get port(): number {
        return this.configService.getOrThrow('app.port', { infer: true });
    }

    public get apiPrefix(): string {
        return this.configService.getOrThrow('app.apiPrefix', { infer: true });
    }

    public get logLevel(): string {
        return this.configService.getOrThrow('app.logLevel', { infer: true });
    }
}
