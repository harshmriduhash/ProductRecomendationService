import { IsArray, IsNotEmpty } from 'class-validator';

export class SaveProductDto {
    @IsNotEmpty()
    @IsArray()
    products: {
        id: string;
        name: string;
        description: string;
        tags: string[];
    }[];
}
