import { IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity'; // Import the enum

export class CreatePaymentDto {
   @IsNumber()
    userId!: number;
    
    @IsNumber()
    orderId!: number;
 // Changed from IsString
    @IsEnum(PaymentMethod) // Add enum validation
    method!: PaymentMethod; // Changed type to PaymentMethod enum
}