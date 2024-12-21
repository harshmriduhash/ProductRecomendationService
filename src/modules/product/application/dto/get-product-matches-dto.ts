import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetProductMatchesDto {
    @IsNotEmpty()
    @IsString()
    productId: string;
}

export class GetProductMatchesResponseDto {
    @IsNotEmpty()
    @IsArray()
    recommendations: {
        productId: string;
        score: number;
    };
}
