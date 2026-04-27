import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FooditemsModule } from './fooditems/fooditems.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { Users } from './users/entities/user.entity';
import { Fooditems } from './fooditems/entities/fooditem.entity';
import { Order } from './orders/entities/order.entity';
import { Payment } from './payments/entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        /* DB CONFIG SETTINGS
           MAKE SURE ENV IS ACCURATE
        */
        type: 'oracle',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        serviceName: config.get('DB_SERVICE_NAME'),
        synchronize: config.get('DB_SYNCHRONIZE') === 'true',
        entities: [Fooditems, Users, Order, Payment], // all entities available
        logging: true,
      }),
    }),
    UsersModule,
    FooditemsModule,
    OrdersModule,
    PaymentsModule,
  ],
})

export class AppModule {}
