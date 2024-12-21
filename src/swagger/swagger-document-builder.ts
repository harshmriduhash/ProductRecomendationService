import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUI } from './swagger-ui.class';
import { SWAGGER_TAGS } from './swagger-tags/swagger-tags.constants';
import { AppConfigService } from '../configuration/app/app-config.service';

export class SwaggerDocumentBuilder {
    constructor(private readonly app: INestApplication<any>) {}

    private buildConfig() {
        const docBuilder = new DocumentBuilder()
            .setTitle('API Documentation')
            .setDescription('This is the Custom Swagger UI API application.')
            .setVersion('1.0')
            .addBasicAuth()
            .addBearerAuth(
                {
                    bearerFormat: 'Bearer',
                    scheme: 'Bearer',
                    type: 'http',
                    in: 'Header',
                },
                'JWTAuthorization',
            );

        SWAGGER_TAGS.forEach((tag) => {
            docBuilder.addTag(tag.name, tag.description);
        });

        return docBuilder.build();
    }

    private createDocument() {
        const config = this.buildConfig();
        return SwaggerModule.createDocument(this.app, config);
    }

    public setupSwagger() {
        const document = this.createDocument();

        const appConfig: AppConfigService = this.app.get(AppConfigService);

        const swaggerUI = new SwaggerUI(`${appConfig.url}:${appConfig.port}`);
        SwaggerModule.setup('docs', this.app, document, swaggerUI.customOptions);
    }
}
