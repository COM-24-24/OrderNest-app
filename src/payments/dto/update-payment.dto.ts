import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreatePaymentDto)
export class UpdatePaymentDto extends PartialType(CreatePaymentDto){}