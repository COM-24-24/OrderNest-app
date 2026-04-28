import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async create(CreatePaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.ordersRepository.create({ 
      id: CreatePaymentDto.orderId,
    });
    if (!order) {
      throw new Error('Order not found');
    }

    const payment = this.paymentsRepository.create({
      method: CreatePaymentDto.method,
      order,
    });
    return this.paymentsRepository.save(payment);
  }

  async findAll() {
    return this.paymentsRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    return this.paymentsRepository.findOne({ where: {id}, relations: ['order'] });
  }
}
