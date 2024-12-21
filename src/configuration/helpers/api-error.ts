export class ApiError<T = any> extends Error {
    #statusCode: number;
    #message: string;
    #code?: number;
    #data?: T;

    get statusCode(): number {
        return this.#statusCode;
    }

    get message(): string {
        return this.#message;
    }

    get code(): number | undefined {
        return this.#code;
    }

    get data(): T | undefined {
        return this.#data || undefined;
    }

    constructor(statusCode: number, message: string, data?: T, code?: number) {
        super(message);
        this.#data = data;
        this.#code = code;
        this.#statusCode = statusCode;
        this.#message = message;

        console.error({
            statusCode: this.#statusCode,
            message: this.#message,
            data: this.#data,
            code: this.#code,
        });
    }
}
