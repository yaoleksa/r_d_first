import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    quantity: number
    @Column()
    totalPrice: number
    @OneToMany(type => Product, product => product.id)
    products: Product[]
    @OneToOne(type => User)
    userId: number
}