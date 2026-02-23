import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { OrderItemModel } from "./orderItem.model";
import { UserModel } from "./user.model";

@ObjectType()
export class OrderModel {
    @Field(type => Int)
    id: number;
    @Field(type => Int)
    quantity: number;
    @Field(type => Float)
    totalPrice: number;
    @Field(type => [OrderItemModel], { nullable: false })
    orderItems!: OrderItemModel[];
    @Field(type => UserModel)
    user: UserModel;
}