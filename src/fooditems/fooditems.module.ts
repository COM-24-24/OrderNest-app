import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooditemsService } from './fooditems.service';
import { FooditemsController } from './fooditems.controller';
import { Fooditems } from './entities/fooditem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fooditems])],
  providers: [FooditemsService],
  controllers: [FooditemsController]
})
export class FooditemsModule {}
