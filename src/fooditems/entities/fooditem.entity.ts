import { Order } from 'src/orders/entities/order.entity';
import { 
    Entity,
     PrimaryGeneratedColumn,
     Column,
     CreateDateColumn,
     OneToMany
     } from 'typeorm';

export enum Status {
    isAvailable = 'isAvailable',
    notAvailable = 'notAvailable'
}

@Entity('fooditems')
export class Fooditems {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column()
    description!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({
        // Oracle does not support native ENUM types.
        // We store the string value of the enum as a VARCHAR2 in the database.
        type: 'varchar',
        default: Status.isAvailable,
        length: 50 // Choose an appropriate length for your enum values (e.g., 'notAvailable' is 12 chars)
    })
    status: Status = Status.isAvailable;

    @OneToMany(() => Order, (order) => order.fooditem)
    orders!:Order[];

    @CreateDateColumn()
    createdAt: Date = new Date();
}