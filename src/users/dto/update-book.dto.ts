import { PartialType } from '@nestjs/mapped-types'; 
import { CreateUserDto } from './create-book.dto'; 

export class UpdateUserDto extends PartialType(CreateUserDto) {}