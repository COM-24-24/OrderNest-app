import { PartialType } from '@nestjs/mapped-types'; 
import { CreateFooditemDto } from './create-book.dto'; 

export class UpdateFooditemDto extends PartialType(CreateFooditemDto) {}
