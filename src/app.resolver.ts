import { Resolver, Query, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { OrdersService } from "./entities/orders/orders.service";
import { OrderModel, ProductModel } from "./models";
import { OrdersFilterInput } from "./models/OrdersFilterInput";
import { OrdersPaginationInput } from "./models/OrdersPaginationInput";
import { ProductDataLoader } from "./entities/products/product.loader";

@Resolver(() => OrderModel)
export class OrderResolver {
    constructor(private orderService: OrdersService, private productDataLoader: ProductDataLoader) {}
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

    @ResolveField(() => ProductModel)
    product(@Parent() order: OrderModel): Promise<(ProductModel | Error)[]> {
        return this.productDataLoader.batchProducts.loadMany(order.orderItems.map(item => item.productId));
    }
}