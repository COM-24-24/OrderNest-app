import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum PaymentMethod {
  Airtel_money = 'Airtel_money',
  TNM_mpamba = 'TNM_mpamba',
  National_bank = 'National_bank',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ type: 'enum', enum: PaymentMethod })
  method!: PaymentMethod;
}
