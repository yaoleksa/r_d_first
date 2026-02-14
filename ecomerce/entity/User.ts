import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({
        unique: true
    })
    email: string;
    
    @OneToMany(type => Order, order => order.user, { cascade: true })
    orders: Order[];
    
}
