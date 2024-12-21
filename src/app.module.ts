import { SharedModule } from './shared/shared.module';
import { Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { v4 as uuidv4 } from 'uuid';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule, AppConfigService } from './configuration';
import { ProductModule } from './modules/product/product.module';

const CORRELATION_ID_HEADER = 'x-correlation-id';

@Module({
    imports: [
        SharedModule,
        AppConfigModule,
        LoggerModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: async (config: AppConfigService) => {
                return {
                    pinoHttp: {
                        level: config.logLevel,
                        genReqId: (request) => request.headers[CORRELATION_ID_HEADER] || uuidv4(),
                        transport: config.nodeEnv !== 'production' ? { target: 'pino-pretty' } : undefined,
                        exclude: [{ method: RequestMethod.ALL, path: 'health' }],
                    },
                };
            },
        }),
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
