import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column({ type: 'int' })
    stock!: number;
    @Column('text', { array: true, default: [] })
    images: string[];
}