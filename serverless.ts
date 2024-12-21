import type { AWS } from '@serverless/typescript';

import * as dotenv from 'dotenv';

dotenv.config();

const serverlessConfiguration: AWS = {
    service: 'ia-challenge',
    frameworkVersion: '4',
    plugins: ['serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        stage: 'dev',
        timeout: 900,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    functions: {
        handler: {
            events: [
                {
                    http: {
                        method: 'any',
                        path: '/{proxy+}',
                        cors: true,
                    },
                },
            ],
            handler: './dist/src/lambda.handler',
        },
    },
    custom: {
        esbuild: {
            bundle: true,
            minify: true,
            sourcemap: true,
            exclude: ['aws-sdk'],
            external: ['pg', 'mysql'],
            target: 'node18',
            platform: 'node',
            concurrency: 10,
        },
    },
    package: {
        individually: true,
        exclude: [
            'node_modules/aws-sdk/**',
            'node_modules/.bin/**',
            'node_modules/**/test/**',
            'node_modules/**/docs/**',
            'node_modules/**/examples/**',
            'src/**',
            'test/**',
            'README.md',
            '.gitignore',
        ],
    },
};

module.exports = serverlessConfiguration;
