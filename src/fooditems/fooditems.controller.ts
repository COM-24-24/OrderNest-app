import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Param 
} from '@nestjs/common';
import { CreateFooditemDto } from './dto/create-fooditem.dto'; 
import { UpdateFooditemDto } from './dto/update-fooditem.dto'; 
import { FooditemsService } from './fooditems.service';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Public } from 'src/auth/decorators/public.decorator';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
 } from '@nestjs/swagger';

@ApiTags('fooditems')
@ApiBearerAuth()
@Controller('fooditems')
export class FooditemsController {
    constructor(private readonly fooditemsService: FooditemsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new food item' })
    @ApiResponse({ status: 201, description: 'Food item created successfully' })
    @Roles(Role.Admin)
    create(@Body() createFooditemDto: CreateFooditemDto) {
        return this.fooditemsService.create(createFooditemDto);
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Retrieve all food items' })
    @ApiResponse({ status: 200, description: 'Food items retrieved successfully' })
    findAll() {
        return this.fooditemsService.findAll();
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a food item by ID' })
    @ApiResponse({ status: 200, description: 'Food item retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Food item not found' })
    findOne(@Param('id') id: string) {
        return this.fooditemsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a food item' })
    @ApiResponse({ status: 200, description: 'Food item updated successfully' })
    @ApiResponse({ status: 404, description: 'Food item not found' })
    @Roles(Role.Admin)
    update(@Param('id') id: string, @Body() updateFooditemDto: UpdateFooditemDto) {
        return this.fooditemsService.update(+id, updateFooditemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a food item' })
    @ApiResponse({ status: 200, description: 'Food item deleted successfully' })
    @ApiResponse({ status: 404, description: 'Food item not found' })
    @Roles(Role.Admin)
    remove(@Param('id') id: string) {
        return this.fooditemsService.remove(+id);
    }
}
