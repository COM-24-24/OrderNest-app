import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(Role.Customer) // Only authenticated users can create payments
  create(@Body() CreatePaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(CreatePaymentDto);
  }

  @Patch(':id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentDto,
  )
  {
    return this.paymentsService.update(id, dto);
  }

  @Get()
  @Roles(Role.Admin, Role.Customer, Role.Agent) // Only Admin can view all payments
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Customer, Role.Agent) // Only Admin can view individual payments
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.findOne(+id);
  }
}
