import { Product } from "../../../ecomerce";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}
    // corresponding with POST HTTP method
    addNewProduct(prtoduct: Product) {
        const newProduct = this.productRepository.create(prtoduct);
        try {
            this.productRepository.save(newProduct);
        } catch(err) {
            return err.message;
        }
    }
    // corresponding with GET HTTP method
    showProductList(): Promise<Product[]> {
        return this.productRepository.find();
    }
    // corresponding with DELETE HTTP method
    async deleteProduct(id: number) {
        await this.productRepository.delete(id);
    }
}