import { Module } from '@nestjs/common';
import { FooditemsService } from './fooditems.service';
import { FooditemsController } from './fooditems.controller';

@Module({
  providers: [FooditemsService],
  controllers: [FooditemsController]
})
export class FooditemsModule {}
