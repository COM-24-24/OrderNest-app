import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from 'src/orders/entities/order.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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
      userId: CreatePaymentDto.userId,
    });
    return this.paymentsRepository.save(payment);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error('Payment not found');
    }
    return this.paymentsRepository.save({ ...payment, ...updatePaymentDto });
  }

  async findAll() {
    return this.paymentsRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    return this.paymentsRepository.findOne({ where: {id}, relations: ['order'] });
  }
}
