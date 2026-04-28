import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() CreateOrderDto: CreateOrderDto) {
    return this.ordersService.create(CreateOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(+id);
  }
}
