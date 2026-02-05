import { Controller, Get, Post, Delete, Body, Param, HttpCode } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "../../../ecomerce";
import { ZodValidationPipe, createProductSchema } from "../pipes/Pipe";

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    @HttpCode(200)
    async displayAllProducts(): Promise<Product[]> {
        return this.productService.showProductList();
    }

    @Post()
    @HttpCode(201)
    async addNewProduct(@Body(new ZodValidationPipe(createProductSchema)) product: Product): Promise<Product> {
        return await this.productService.addNewProduct(product);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteProductById(@Param('id') id) {
        return this.productService.deleteProduct(id);
    }
}