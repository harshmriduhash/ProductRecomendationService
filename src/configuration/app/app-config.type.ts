export enum ENVIRONMENT {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
}

export enum LOG_LEVEL {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    TRACE = 'trace',
}

export type AppConfig = {
    nodeEnv: string;
    name: string;
    url: string;
    port: number;
    apiPrefix: string;
    logLevel: string;
};
