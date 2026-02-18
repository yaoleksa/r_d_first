import { Controller, Get, Post, Param, Body, UseInterceptors, Headers } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { IdempotencyInterceptor } from "../../interceptor/IdempotencyInterceptor";
import { OrdersFilterInput } from "../../models";

@Controller('/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    @Get(':userId')
    async showAllUsersOrders(@Param('userId') userId: any): Promise<any> {
        const orderFilterInput = new OrdersFilterInput();
        orderFilterInput.userId = userId;
        return await this.orderService.displayAllUserOrders(orderFilterInput);
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