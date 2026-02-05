import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
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
    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[]
    @ManyToOne(type => User, user => user.orders, { eager: true })
    user: User
    constructor(quantity?: number, totalPrice?: number, products?: Product[], user?: User) {
        if(quantity) {
            this.quantity = quantity;
            this.totalPrice = totalPrice;
            this.products = products;
            this.user = user;
        }
    }
}