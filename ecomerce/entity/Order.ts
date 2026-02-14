import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany, 
    Index,
    CreateDateColumn 
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Index(['user', 'idempotencyKey'], { unique: true })
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    quantity: number;
    @Column()
    totalPrice: number;
    @OneToMany(type => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems!: OrderItem[];
    @ManyToOne(type => User, user => user.orders, { eager: true })
    @JoinColumn({
        name: 'userId'
    })
    user: User;
    @Column({ type: 'varchar' })
    idempotencyKey: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}