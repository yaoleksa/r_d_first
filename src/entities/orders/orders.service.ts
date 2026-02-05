import { Injectable } from "@nestjs/common";
import { Order } from "../../../ecomerce";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export class OrdersService {
    constructor(private dataSource: DataSource) {}
    async createOrder(newOrder: Order): Promise<Order> {
        // Calculate products related fields
        newOrder.totalPrice = newOrder.products.reduce((ac, cv) => ac + cv.price, 0);
        newOrder.quantity = newOrder.products.length;
        // Individual QueryRunner for each transaction
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const ordersList = await queryRunner.manager.save(newOrder);
            await queryRunner.commitTransaction();
            return ordersList;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
    async displayAllOrders(): Promise<Order[]> {
        return this.dataSource.getRepository(Order).find();
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