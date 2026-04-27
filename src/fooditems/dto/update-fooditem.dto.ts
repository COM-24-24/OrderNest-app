import { PartialType } from '@nestjs/mapped-types'; 
import { CreateFooditemDto } from './create-fooditem.dto'; 

export class UpdateFooditemDto extends PartialType(CreateFooditemDto) {}
