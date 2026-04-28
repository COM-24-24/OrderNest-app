import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Users } from 'src/users/entities/user.entity';
import { Fooditems } from 'src/fooditems/entities/fooditem.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Users, Fooditems, Payment])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
