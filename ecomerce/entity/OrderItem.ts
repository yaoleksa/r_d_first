import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(type => Product)
    @JoinColumn({
        name: 'productId'
    })
    product: Product
    @ManyToOne(type => User)
    @JoinColumn({
        name: 'userId'
    })
    owner: User
    @Column()
    price: number 
}