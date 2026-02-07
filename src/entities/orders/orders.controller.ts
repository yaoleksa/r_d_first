import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Product } from "../../../ecomerce";

@Controller('/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    @Get(':userId')
    async showAllUsersOrders(@Param('userId') userId: any): Promise<any> {
        return await this.orderService.displayAllUserOrders(parseInt(userId));
    }
    @Post(':userId')
    async createOrder(@Param('userId') userId: number, @Body() products: Product[]) {
        console.log(products);
        return await this.orderService.createOrder(userId, products);
    }
}