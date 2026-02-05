import { Injectable } from "@nestjs/common";
import { Order, Product, User } from "../../../ecomerce";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export class OrdersService {
    constructor(private dataSource: DataSource) {}
    async createOrder(userId: number, products: Product[]): Promise<Order> {
        // Calculate products related fields 
        const totalPrice = products.reduce((ac, cv) => ac + cv.price, 0);
        const quantity = products.length;
        // Individual QueryRunner for each transaction
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Create a new order
            const newOrder = new Order(quantity, totalPrice, products, await this.dataSource.getRepository(User).findOne({
                where: {
                    id: userId
                }
            }));
            const newOrderRecord = await queryRunner.manager.save(newOrder);
            await queryRunner.commitTransaction();
            return newOrderRecord;
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