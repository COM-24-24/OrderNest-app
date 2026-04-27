import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum PaymentMethod {
  Airtel_money = 1,
  TNM_mpamba = 2,
  National_bank = 3,
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  // Oracle does not support native ENUM types.
  // We store the numeric value of the enum as a NUMBER in the database.
  @Column({ type: 'number' }) // Removed 'enum: PaymentMethod'
  method!: PaymentMethod;
}
