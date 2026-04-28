import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() CreatePaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(CreatePaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.findOne(+id);
  }
}
