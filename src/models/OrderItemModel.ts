import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ProductModel } from "./product.model";

@ObjectType()
export class OrderItemModel {
    @Field(() => Int)
    quantity: number;
    @Field(() => ProductModel)
    product: ProductModel;
    @Field(() => Int)
    productId: number;
}