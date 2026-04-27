import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty()
    id: number = 0;

    @IsNumber()
    @IsNotEmpty()
    order!: Order;

    @IsString()
    @IsNotEmpty()
    method!: string;
}