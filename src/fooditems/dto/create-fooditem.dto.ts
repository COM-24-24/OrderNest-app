import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsEnum,
} from 'class-validator';
import { Status } from '../entities/fooditem.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFooditemDto {
    @ApiProperty({
        example: 'Margherita Pizza',
        description: 'The name of the food item',
    })
    @IsString()
    @IsNotEmpty()
    name: string = '';

    @ApiPropertyOptional({
        example: 'A delicious margherita pizza',
        description: 'A brief description of the food item',
    })
    @IsString()
    @IsOptional() // Matching the optional '?' type
    description?: string;

    @ApiProperty({
        example: 12.99,
        description: 'The price of the food item',
    })
    @IsNumber()
    @IsNotEmpty()
    price: number = 0;

    @ApiPropertyOptional({
        example: Status.isAvailable,
        description: 'The status of the food item',
        enum: Status,
    })
    @IsOptional()
    @IsEnum(Status)
    status?: Status = Status.isAvailable;
}