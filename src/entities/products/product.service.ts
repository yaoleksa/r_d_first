import { Product } from "../../../ecomerce";
import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, QueryRunner } from "typeorm";

@Injectable()
export class ProductService {
    constructor(private dataSource: DataSource) {}
    // corresponding with POST HTTP method
    async addNewProduct(product: Product): Promise<Product> {
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newProduct = await queryRunner.manager.create(Product, product);
            const savedProduct = await queryRunner.manager.save(newProduct);
            await queryRunner.commitTransaction();
            return savedProduct;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw err;
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
    async deleteProduct(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(Product).delete(id);
    }
}