import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { SwaggerDocumentBuilder } from './swagger/swagger-document-builder';
import helmet from 'helmet';
import { AppConfigService } from './configuration/app/app-config.service';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    const appConfig: AppConfigService = app.get(AppConfigService);

    // configure logger
    const logger = app.get(Logger);
    app.useLogger(logger);

    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.enableCors();
    app.use(json({ limit: '50mb' }));

    const swaggerDocumentBuilder = new SwaggerDocumentBuilder(app);
    swaggerDocumentBuilder.setupSwagger();

    await app.listen(appConfig.port);
    logger.log(`Application is running on: ${appConfig.url}:${appConfig.port}`);
}

void bootstrap();
