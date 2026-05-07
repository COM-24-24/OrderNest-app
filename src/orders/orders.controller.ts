import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.Customer, Role.Admin) // Only authenticated users can create orders
  create(@Body() CreateOrderDto: CreateOrderDto) {
    return this.ordersService.create(CreateOrderDto);
  }

  @Get()
  @Roles(Role.Customer, Role.Admin) // Only authenticated users can view their own orders
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Customer, Role.Admin) // Only authenticated users can view their own orders
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/assign-agent')
  @Roles(Role.Admin) // Only admins can assign agents to orders
  async assignAgent(
    @Param('id', ParseIntPipe) orderId: number,
    @Body('agentId', ParseIntPipe) { agentId }: { agentId: number },
  ) {
    return this.ordersService.assignAgent(orderId, agentId);
  }
}
