import { IsNumber, IsNotEmpty} from 'class-validator';
import { OrderSize, DeliveryTime } from '../entities/order.entity';

export class CreateOrderDto {
    @IsNumber()
    userId!: number;

    @IsNumber()
    amount!: OrderSize;

    @IsNotEmpty()
    deliveryAddress!: string;
}