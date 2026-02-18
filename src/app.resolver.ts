import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { OrdersService } from "./entities/orders/orders.service";
import { OrderModel } from "./models/order.model";
import { OrdersFilterInput } from "./models/OrdersFilterInput";
import { OrdersPaginationInput } from "./models/OrdersPaginationInput";

@Resolver(() => OrderModel)
export class OrderResolver {
    constructor(private orderService: OrdersService) {}
    @Query(() => String)
    async smokeQuery(): Promise<String> {
        return "Playground is healthy ;)";
    }
    @Query(() => OrderModel)
    async order(@Args('id', { type: () => Int }) id: number) {
        return this.orderService.displayOne(id);
    }
    @Query(() => [OrderModel])
    async orders(
        @Args('filter', { nullable: true }) filter: OrdersFilterInput, 
        @Args('pagination', { nullable: true }) pagination: OrdersPaginationInput
    ) {
        return this.orderService.displayAllUserOrders(filter, pagination);
    }
}