import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsEnum,
} from 'class-validator';
import { Status } from '../entities/fooditem.entity';

export class CreateFooditemDto {
    @IsString()
    @IsNotEmpty()
    name: string = '';

    @IsString()
    @IsOptional() // Matching the optional '?' type
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number = 0;

    @IsOptional()
    @IsEnum(Status)
    status?: Status = Status.isAvailable;
}