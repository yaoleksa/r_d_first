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

export enum OrderStatus {
    CREATED = 'created',
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
    REFUNDED = 'refunded'
}

@Index('idx_order_user_createdAt', ['user', 'createdAt'])
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
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
    status: OrderStatus
    @Column({ type: 'varchar' })
    idempotencyKey: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000).toISOString() })
    dateTo: Date
}