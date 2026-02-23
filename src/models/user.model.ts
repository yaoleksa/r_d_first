import { Field, Int, ObjectType } from "@nestjs/graphql";
import { OrderModel } from "./order.model";

@ObjectType()
export class UserModel {
    @Field(type => Int)
    id: number;
    @Field(type => String)
    firstName: string;
    @Field(type => String)
    lastName: string;
    @Field(type => Int)
    age: number;
    @Field(type => String)
    email: string;
    @Field(type => [OrderModel])
    orders: OrderModel
}