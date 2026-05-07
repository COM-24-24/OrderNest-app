import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Users } from 'src/users/entities/user.entity';

export enum PaymentMethod {
  Airtel_money = 1,
  TNM_mpamba = 2,
  National_bank = 3,
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: 'user_id', nullable: true })
  userId!: number | null;

  @ManyToOne(() => Users, { nullable: true, onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: Users | null;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false, onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  // We store the numeric value of the enum as a NUMBER in the database.
  @Column({ type: 'number' })
  method!: PaymentMethod;
}
