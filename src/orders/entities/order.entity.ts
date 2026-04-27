import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum OrderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum DeliveryTime {
  Lunch = 'lunch',
  Dinner = 'dinner',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Users, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({
    type: 'varchar',
    enum: OrderSize,
    default: OrderSize.Small,
  })
  amount: OrderSize = OrderSize.Small;

  @Column({ name: 'delivery_address' })
  deliveryAddress: string = '';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @Column({
    name: 'delivery_time',
    type: 'varchar',
    enum: DeliveryTime,
    default: DeliveryTime.Lunch,
  })
  deliveryTime: DeliveryTime = DeliveryTime.Lunch;

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  payments: Payment[];
}
