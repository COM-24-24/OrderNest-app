import { PartialType } from '@nestjs/mapped-types'; 
import { CreateFooditemDto } from './create-fooditem.dto';
import { ApiExtraModels, ApiPropertyOptional } from '@nestjs/swagger';

@ApiExtraModels(CreateFooditemDto)
export class UpdateFooditemDto extends PartialType(CreateFooditemDto) {}
