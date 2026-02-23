import { 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    Column, 
    JoinColumn,
    RelationId 
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type => Product, product => product.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'productId'
    })
    product: Product;
    @ManyToOne(type => User, user => user.id)
    @JoinColumn({
        name: 'userId'
    })
    owner: User;
    @ManyToOne(type => Order, order => order.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'orderId'
    })
    order: Order;
    @Column()
    quantity: number;
    @RelationId((orderItem: OrderItem) => orderItem.product)
    productId_: number;
}