import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Product } from "./Product";
import { User } from "../../src/entity/User";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(type => Product)
    productId: number
    // @ManyToOne(type => User)
    // userId: number
    @Column()
    price: number 
}