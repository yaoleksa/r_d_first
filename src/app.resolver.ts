import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { OrdersService } from "./entities/orders/orders.service";
import { Order } from "../ecomerce";

@Resolver(() => Order)
export class OrderResolver {
    constructor(private orderService: OrdersService) {}
    @Query(() => String)
    async order(@Args('id', { type: () => Int }) id: number) {
        return this.orderService.displayOne(id);
    }
}