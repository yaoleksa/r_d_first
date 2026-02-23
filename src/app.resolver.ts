import { Resolver, Query, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { OrdersService } from "./entities/orders/orders.service";
import { OrderModel, OrderItemModel, ProductModel } from "./models";
import { OrdersFilterInput } from "./models/OrdersFilterInput";
import { OrdersPaginationInput } from "./models/OrdersPaginationInput";
import { ProductDataLoader } from "./entities/products/product.loader";

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

@Resolver(() => OrderItemModel)
export class OrderItemResolver {
    constructor(private readonly productDataLoader: ProductDataLoader) {}

    @ResolveField(() => ProductModel)
        product(@Parent() orderItem: OrderItemModel): Promise<(ProductModel | Error)> {
            return this.productDataLoader.batchProducts.load(orderItem.product.id)
        }
}