import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RetryService {
    readonly logger = new Logger(RetryService.name);

    /**
     * Executes an asynchronous task with a timeout and automatic retries.
     * @param task The asynchronous task to be executed.
     * @param timeout Maximum time in milliseconds to complete the task.
     * @param retries Maximum number of retry attempts.
     * @returns The result of the task.
     */
    async retryWithTimeout<T>(task: () => Promise<T>, timeout: number, retries: number): Promise<T> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const result = await this.withTimeout(task, timeout);
                return result;
            } catch (error: Error | any) {
                if (attempt === retries) {
                    this.logger.error(`Task failed after ${retries} attempts: ${error.message}`);
                    throw error;
                }
                this.logger.warn(`Task failed on attempt ${attempt}, retrying...`);
            }
        }

        throw new Error('This should never happen');
    }

    /**
     * Wraps a task with a timeout.
     * @param task The asynchronous task to be executed.
     * @param timeout Maximum time in milliseconds to complete the task.
     * @returns The result of the task if it completes within the timeout.
     */
    withTimeout<T>(task: () => Promise<T>, timeout: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('Task timed out'));
            }, timeout);

            task()
                .then((result) => {
                    clearTimeout(timer);
                    resolve(result);
                })
                .catch((error) => {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    }
}
