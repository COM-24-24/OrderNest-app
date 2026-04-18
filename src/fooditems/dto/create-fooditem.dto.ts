import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFooditemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    @IsString()
    status: string;
}