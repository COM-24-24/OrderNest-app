import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() payment: Payment) {
    return this.paymentsService.create(payment);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
}
