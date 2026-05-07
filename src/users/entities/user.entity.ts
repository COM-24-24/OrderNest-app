import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn, 
    OneToMany 
  } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string = '';

  @Column()
  email: string = '';

  @Column()
  password: string = '';

  @Column()
  phone: string = '';

  @Column()
  address: string = '';

  @Column()
  role: string = 'customer'; // Default role is 'customer'

  @OneToMany(() => Payment, (payment) => payment.user)
  payments!: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}