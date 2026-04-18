import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  create(payment: Payment) {
    return this.paymentsRepository.save(payment);
  }

  findAll() {
    return this.paymentsRepository.find({ relations: ['order'] });
  }
}
