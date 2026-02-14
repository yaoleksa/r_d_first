import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";
import { OrderModel } from "./order.model";

@ObjectType()
export class OrderItemModel {
    @Field(type => Int)
    id: number;
    @Field(type => ProductModel)
    product!: ProductModel;
    @Field(type => UserModel)
    owner: UserModel;
    @Field(type => OrderModel)
    order: OrderModel;
    @Field(type => Int)
    quantity: number;
}