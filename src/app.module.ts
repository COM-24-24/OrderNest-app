import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FooditemsModule } from './fooditems/fooditems.module';

@Module({
  imports: [UsersModule, FooditemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
