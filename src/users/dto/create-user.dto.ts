import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'The email address of the user',
    })
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
    })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({
        example: '123-456-7890',
        description: 'The phone number of the user',
    })
    @IsString()
    @IsNotEmpty()
    phone!: string;

    @ApiPropertyOptional({
        example: '123 Main St',
        description: 'The address of the user',
    })
    @IsOptional()
    @IsString()
    address!: string;
    
}