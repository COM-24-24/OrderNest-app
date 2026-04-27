import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fooditems } from './entities/fooditem.entity';
import { CreateFooditemDto } from './dto/create-fooditem.dto';
import { UpdateFooditemDto } from './dto/update-fooditem.dto';

@Injectable()
export class FooditemsService {
    constructor (
    @InjectRepository(Fooditems)
    private fooditemsRepository: Repository<Fooditems>,
    ) {}

    async create(createFooditemDto: CreateFooditemDto): Promise<Fooditems> {
    const fooditem = this.fooditemsRepository.create(createFooditemDto);
    return await this.fooditemsRepository.save(fooditem);
    }

    async findAll(): Promise<Fooditems[]> {
    return await this.fooditemsRepository.find();
    }
    
    async findOne(id: number): Promise<Fooditems> {
    const fooditem = await this.fooditemsRepository.findOne({ where: {id} });
    if (!fooditem) throw new NotFoundException(`Fooditem with id ${id} not found`);
    return fooditem;
    }

    async update(id: number, updateFooditemDto: UpdateFooditemDto): Promise<Fooditems> { 
    await this.findOne(id);
    await this.fooditemsRepository.update(id, updateFooditemDto);
    return await this.findOne(id);
    }

    async remove(id: number): Promise<{ message: string }> { 
    await this.findOne(id); 
    await this.fooditemsRepository.delete(id); 
    return { message: `Fooditem ${id} deleted successfully` }; 
    }
}
