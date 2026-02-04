import { Product } from "../../../ecomerce";
import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, QueryRunner } from "typeorm";

@Injectable()
export class ProductService {
    constructor(private dataSource: DataSource) {}
    // corresponding with POST HTTP method
    async addNewProduct(prtoduct: Product): Promise<Product | string> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newProduct = await queryRunner.manager.save(prtoduct);
            await queryRunner.commitTransaction();
            return newProduct;
        } catch(err) {
            queryRunner.rollbackTransaction();
            return err.message;
        } finally {
            // Avoid ERROR: too many connections
            queryRunner.release();
        }
    }
    // corresponding with GET HTTP method
    async showProductList(): Promise<Product[]> {
        return this.dataSource.getRepository(Product).find();
    }
    // corresponding with DELETE HTTP method
    async deleteProduct(id: number) {
        return this.dataSource.getRepository(Product).delete(id);
    }
}