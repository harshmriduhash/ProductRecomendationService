import { IValidable } from '../../../../configuration/helpers/validable';

export class Product implements IValidable {
    id: string;
    name: string;
    description: string;
    tags: string[];

    validate(): void {
        if (!this.id || !this.name || !this.description || !this.tags) {
            throw new Error('Invalid product');
        }
    }

    constructor(id: string, name: string, description: string, tags: string[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
    }
}
