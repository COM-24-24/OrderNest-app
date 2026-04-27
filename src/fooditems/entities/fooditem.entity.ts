import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

enum Status {
    isAvailable = 'isAvailable',
    notAvailable = 'notAvailable'
}

@Entity('fooditems')
export class Fooditems {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.isAvailable
    })
    status: Status = Status.isAvailable;

    @CreateDateColumn()
    createdAt: Date = new Date();
}