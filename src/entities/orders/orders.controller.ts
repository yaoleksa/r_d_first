import { Controller, Get, Post, Param, Body, UseInterceptors, Headers } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { IdempotencyInterceptor } from "../../interceptor/IdempotencyInterceptor";

@Controller('/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    @Get(':userId')
    async showAllUsersOrders(@Param('userId') userId: any): Promise<any> {
        return await this.orderService.displayAllUserOrders(parseInt(userId));
    }
    @Post(':userId')
    @UseInterceptors(IdempotencyInterceptor)
    async createOrder(
        @Headers('idempotency-key') idempotencyKey: string, 
        @Param('userId') userId: number, 
        @Body() products: number[]
    ) {
        return await this.orderService.createOrder(userId, products, idempotencyKey);
    }
}