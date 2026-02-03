import { Product } from "../../../ecomerce";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    private queryRunner: QueryRunner;
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}
    // corresponding with POST HTTP method
    addNewProduct(prtoduct: Product) {
        this.productRepository.create(prtoduct);
    }
    // corresponding with GET HTTP method
    showProductList(): Promise<Product[]> {
        return this.productRepository.find();
    }
}