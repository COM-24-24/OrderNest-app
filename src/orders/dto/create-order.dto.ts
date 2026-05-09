import { IsNumber, IsNotEmpty, IsOptional} from 'class-validator';
import { OrderSize, DeliveryTime } from '../entities/order.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: 'The ID of the user placing the order',
    })
    @IsNumber()
    userId!: number;

    @ApiProperty({
        example: OrderSize.Medium,
        description: 'The size of the order',
        enum: OrderSize,
    })
    @IsNumber()
    amount!: OrderSize;

    @ApiProperty({
        example: '123 Main St',
        description: 'The address where the order will be delivered',
    })
    @IsNotEmpty()
    deliveryAddress!: string;

    @ApiProperty({
        example: 1,
        description: 'The ID of the food item being ordered',
    })
    @IsNotEmpty()
    fooditemId!: number;

    @ApiPropertyOptional({
        example: DeliveryTime.Lunch,
        description: 'The preferred delivery time',
        enum: DeliveryTime,
    })
    @IsOptional()
    deliveryTime!: DeliveryTime;
}