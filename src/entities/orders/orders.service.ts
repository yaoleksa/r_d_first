import { Injectable, InternalServerErrorException, HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { Order, OrderItem, Product, User } from "../../../ecomerce";
import { DataSource, QueryRunner, In } from "typeorm";
import { OrdersPaginationInput } from "../../models";

@Injectable()
export class OrdersService {
    constructor(private dataSource: DataSource) {}

    async createOrder(userId: number, products: number[], idempotencyKey: string): Promise<Order> {
        // Individual QueryRunner for each transaction
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Implement logic here
            const order: Order = new Order();
            // Get order owner from database
            const owner: User = await queryRunner.manager.findOne(User, {
                where: {
                    id: userId
                }
            });
            // Check if it is a valid user
            if(!owner) {
                throw new Error("There is no such user!");
            }
            // Get respectively products list from database
            const productsList: Product[] = await queryRunner.manager
            .createQueryBuilder(Product, 'products')
            .setLock('pessimistic_write')
            .where({
                id: In(products)
            }).getMany();
            // Check if there are valid ids in the input list
            if(productsList.length === 0) {
                throw new Error("There are no valid products IDs!");
            }
            // Map id and respectively Product entity
            const productsMap: Map<number, Product> = new Map<number, Product>();
            for(let p of productsList) {
                productsMap.set(p.id, p);
            }
            // Calculate quantity for each product in the list. There program doesn't check if product is valid
            const productCountMap: Map<number, number> = new Map<number, number>();
            for(let product of products) {
                productCountMap.set(product, (productCountMap.get(product) ?? 0) + 1);
            }
            let totalPrice = 0;
            let totalQuantity = 0;
            const orderItemList: OrderItem[] = new Array<OrderItem>();
            for(let [id, quantity] of productCountMap) {
                // If there are invalid products' IDs in the input list it helps to avoid application crash!
                if(!productsMap.has(id)) {
                    continue;
                }
                let orderItem = new OrderItem();
                const product = productsMap.get(id);
                orderItem.product = product;
                orderItem.quantity = quantity;
                orderItem.owner = owner;
                totalPrice += orderItem.product.price * quantity;
                totalQuantity += quantity;
                // To implement products' stock logic
                product.stock += -quantity;
                if(product.stock < 0) {
                    throw new HttpException(
                        `There is not enough supplies of ${product.title} product. Transaction has failed =(`,
                        HttpStatus.CONFLICT
                    );
                }
                orderItemList.push(orderItem);
            }
            order.orderItems = orderItemList;
            order.quantity = totalQuantity;
            order.totalPrice = totalPrice;
            order.user = owner;
            order.idempotencyKey = idempotencyKey;
            // Save products' records with new quantity
            await queryRunner.manager.save(Product, productsList);
            const newOrder = await queryRunner.manager.save(Order, order);
            await queryRunner.commitTransaction();
            return newOrder;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            // Return existing record if idempotency key is not unique
            if(err.code === '23505') {
                return await this.dataSource.getRepository(Order).findOne({
                    where: {
                        idempotencyKey: idempotencyKey,
                        user: {
                            id: userId
                        }
                    },
                    relations: {
                        orderItems: {
                            product: true
                        },
                        user: true
                    }
                });
            } else if(err.status === 409) {
                throw new HttpException(err.message, HttpStatus.CONFLICT);
            }
            throw new InternalServerErrorException(err.message);
        } finally {
            // Avoid QueryRunnerAlreadyReleasedError
            await queryRunner.release();
        }
    }
    
    async displayAllUserOrders(userId: number, pagination?: OrdersPaginationInput): Promise<Order[]> {
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const ordersList = await queryRunner.manager.find(Order, {
                where: {
                    user: {
                        id: userId
                    }
                },
                relations: {
                    orderItems: {
                        product: true
                    },
                    user: true
                },
                take: pagination?.limit,
                skip: pagination?.offset
            });
            await queryRunner.commitTransaction();
            return ordersList;
        } catch(err) {
            throw new InternalServerErrorException(err.message);
        } finally {
            // Avoid QueryRunnerAlreadyReleasedError
            await queryRunner.release();
        }
    }

    async displayOne(id: number) {
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const targetOrder = await queryRunner.manager.findOne(Order, {
                where: {
                    id: id
                },
                relations: {
                    orderItems: {
                        product: true
                    },
                    user: true
                }
            });
            await queryRunner.commitTransaction();
            return targetOrder;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(err.message);
        } finally {
            // Avoid QueryRunnerAlreadyReleasedError
            await queryRunner.release();
        }
    }
    async deleteOrder(id: number) {
        return this.dataSource.getRepository(Order).delete(id);
    }
}