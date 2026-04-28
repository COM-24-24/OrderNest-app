import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  create(order: Order) {
    const newOrder = this.ordersRepository.create(order);
    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['user', 'payments'] });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({ where: {id}, relations: ['user', 'payments'] });
  } 
}
