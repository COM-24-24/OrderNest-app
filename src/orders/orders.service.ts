import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { Fooditems } from 'src/fooditems/entities/fooditem.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Fooditems)
    private readonly fooditemsRepository: Repository<Fooditems>,
    
  ) {}

  
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOneBy({ id: createOrderDto.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const fooditem = await this.fooditemsRepository.findOneBy({ id: createOrderDto.fooditemId });
    if (!fooditem) {
      throw new Error('Food item not found');
    }

    const order = this.ordersRepository.create({
      amount: createOrderDto.amount,
      deliveryAddress: createOrderDto.deliveryAddress,
      deliveryTime: createOrderDto.deliveryTime,
      user,
      fooditem,
    });

    return await this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['user', 'payments'] });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({ where: {id}, relations: ['user', 'payments'] });
  } 
}
