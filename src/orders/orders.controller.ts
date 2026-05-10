import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.Customer, Role.Agent, Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  create(@Body() CreateOrderDto: CreateOrderDto) {
    return this.ordersService.create(CreateOrderDto);
  }

  @Roles(Role.Admin, Role.Agent, Role.Customer)
  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(Role.Admin, Role.Agent, Role.Customer)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/assign-agent')
  @ApiOperation({ summary: 'Assign an agent to an order' })
  @ApiResponse({ status: 200, description: 'Agent assigned successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Roles(Role.Admin)
  async assignAgent(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() { agentId }: { agentId: number },
  ) {
    return this.ordersService.assignAgent(orderId, agentId);
  }
}
