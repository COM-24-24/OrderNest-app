import { IsNumber, IsNotEmpty, IsOptional} from 'class-validator';
import { OrderSize, DeliveryTime } from '../entities/order.entity';

export class CreateOrderDto {
    @IsNumber()
    userId!: number;

    @IsNumber()
    amount!: OrderSize;

    @IsNotEmpty()
    deliveryAddress!: string;

    @IsNotEmpty()
    fooditemId!: number;

    @IsOptional()
    deliveryTime!: DeliveryTime;
}