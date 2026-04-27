import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { CreateFooditemDto } from './dto/create-fooditem.dto'; 
import { UpdateFooditemDto } from './dto/update-fooditem.dto'; 
import { FooditemsService } from './fooditems.service';

@Controller('fooditems')
export class FooditemsController {
    constructor(private readonly fooditemsService: FooditemsService) {}

    @Post()
    create(@Body() createFooditemDto: CreateFooditemDto) {
        return this.fooditemsService.create(createFooditemDto);
    }

    @Get()
    findAll() {
        return this.fooditemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.fooditemsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFooditemDto: UpdateFooditemDto) {
        return this.fooditemsService.update(+id, updateFooditemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fooditemsService.remove(+id);
    }
}
