import { Injectable } from "@nestjs/common";
import { Order, Product, User } from "../../../ecomerce";
import { DataSource, QueryRunner, In } from "typeorm";

@Injectable()
export class OrdersService {
    constructor(private dataSource: DataSource) {}
    async createOrder(userId: number, products: number[]): Promise<Order> {
        // Individual QueryRunner for each transaction
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Get products
            const productsList: Product[] = await this.dataSource.getRepository(Product).findBy({
                id: In(products)
            });
            console.log(productsList);
            // Calculate products related fields 
            const totalPrice = productsList.reduce((ac, cv) => ac + cv.price, 0);
            const quantity = productsList.length;
            // Create a new order
            const newOrder = new Order(quantity, totalPrice, productsList, await this.dataSource.getRepository(User).findOne({
                where: {
                    id: userId
                }
            }));
            const newOrderRecord = await this.dataSource.getRepository(Order).create(newOrder);
            console.log(newOrderRecord);
            const savedOrderRecord = await queryRunner.manager.save(newOrderRecord);
            await queryRunner.commitTransaction();
            return savedOrderRecord;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
    async displayAllUserOrders(userId: number): Promise<Order[]> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            return await queryRunner.manager.findBy(Order, {
                user: await this.dataSource.getRepository(User).findOne({
                    where: {
                        id: userId
                    }
                })
            })
        } catch(err) {
            throw err;
        } finally {
            // Avoid memory leak
            await queryRunner.release();
        } 
    }
    async displayOne(id: number) {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const targetOrder = await queryRunner.manager.findOne(Order, {
                where: {
                    id: id
                }
            });
            await queryRunner.commitTransaction();
            return targetOrder;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
    async deleteOrder(id: number) {
        return this.dataSource.getRepository(Order).delete(id);
    }
}