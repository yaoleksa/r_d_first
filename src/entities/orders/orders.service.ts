import { Injectable } from "@nestjs/common";
import { Order } from "../../../ecomerce";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export class OrdersService {
    private queryRunner: QueryRunner;
    constructor(private dataSource: DataSource) {
        this.queryRunner = this.dataSource.createQueryRunner();
    }
    async createOrder(newOrder: Order): Promise<string> {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        try {
            await this.queryRunner.manager.save(newOrder);
            await this.queryRunner.commitTransaction();
            return "Order has been successfully committed!"
        } catch(err) {
            await this.queryRunner.rollbackTransaction();
            return err.message;
        }
    }
    async displayAllOrders(): Promise<Order[] | string> {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        try {
            const ordersList = await this.queryRunner.manager.find(Order);
            await this.queryRunner.commitTransaction();
            return ordersList;
        } catch(err) {
            await this.queryRunner.rollbackTransaction();
            return err.message;
        }
    }
    async displayOne(id: number) {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        try {
            const targetOrder = await this.queryRunner.manager.findOne(Order, {
                where: {
                    id: id
                }
            });
            await this.queryRunner.commitTransaction();
            return targetOrder;
        } catch(err) {
            await this.queryRunner.rollbackTransaction();
            return err.message;
        }
    }
    async deleteOrder(id: number) {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        try {
            await this.queryRunner.manager.delete(Order, id);
            await this.queryRunner.commitTransaction();
            return 'Order has been successfully removed!';
        } catch(err) {
            await this.queryRunner.rollbackTransaction();
            return err.message;
        }
    }
}