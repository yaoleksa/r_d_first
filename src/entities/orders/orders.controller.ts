import { Controller, Get, Post, Delete, Body, Query, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Order, Product, User } from "../../../ecomerce";

@Controller('/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    @Get()
    async showAllOrders(): Promise<Order[]> {
        return await this.orderService.displayAllOrders();
    }
    @Post()
    async createOrder(@Body() order: Order) {
        return await this.orderService.createOrder(order);
    }
}