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
import { Fooditems } from 'src/fooditems/entities/fooditem.entity';

export enum OrderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  // Order size is a number in the database, but we use an enum in TypeScript for better readability.
}

export enum DeliveryTime {
  Lunch = 'lunch',
  Dinner = 'dinner',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, (user) => user.orders, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @ManyToOne(() => Fooditems, (fooditem) => fooditem.orders, {nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fooditem_id' }) // Ensure this matches your DB casing
  fooditem!: Fooditems;

  @Column({
    type: 'varchar',
    enum: OrderSize,
    default: OrderSize.Small,
  })
  amount: OrderSize = OrderSize.Small;

  @Column({ name: 'delivery_address', default: 'Campus' })
  deliveryAddress: string = 'Campus';

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({
    name: 'delivery_time',
    type: 'varchar',
    enum: DeliveryTime,
    default: DeliveryTime.Lunch,
  })
  deliveryTime: DeliveryTime = DeliveryTime.Lunch;

  @ManyToOne(() => Users, { nullable: true }) // Optional relationship to an agent
  @JoinColumn({ name: 'agentId' })
  agent?: Users;

  @Column({ name: 'agentId', nullable: true })
  agentId?: number;

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  payments!: Payment[];
}
