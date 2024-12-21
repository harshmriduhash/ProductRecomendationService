import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import { Context, Handler } from 'aws-lambda';
import express, { json } from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

let cachedServer: Handler;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

        nestApp.enableCors();

        nestApp.useGlobalPipes(new ValidationPipe());
        nestApp.use(helmet());
        nestApp.enableCors();
        nestApp.use(json({ limit: '50mb' }));

        await nestApp.init();

        cachedServer = serverlessExpress({ app: expressApp });
    }

    return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
    const server = await bootstrap();

    if (event.source === 'serverless-plugin-warmup') {
        console.log('WarmUp - Lambda warmed!');
        return {};
    }

    return server(event, context, callback);
};
