import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from 'src/auth/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { from } from 'rxjs';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles(Role.Customer, Role.Agent, Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  create(@Body() CreatePaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(CreatePaymentDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentDto,
  )
  {
    return this.paymentsService.update(id, dto);
  }

  @Roles(Role.Admin, Role.Customer, Role.Agent)
  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @Roles(Role.Admin, Role.Customer, Role.Agent)
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.findOne(+id);
  }
}
