import { IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
   @ApiProperty({
        example: 1,
        description: 'The ID of the user making the payment',
    })
    @IsNumber()
    userId!: number;
    
    @ApiProperty({
        example: 1,
        description: 'The ID of the order for which payment is being made',
    })
    @IsNumber()
    orderId!: number;
    @ApiProperty({
        example: PaymentMethod.Airtel_money,
        description: 'The method of payment',
        enum: PaymentMethod,
    })
    @IsEnum(PaymentMethod)
    method!: PaymentMethod;
}