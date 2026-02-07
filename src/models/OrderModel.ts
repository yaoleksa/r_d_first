import { ObjectType, Int, Field, Float } from "@nestjs/graphql";
import { Product, User } from "../../ecomerce";

@ObjectType()
export class OrderModel {
    @Field(type => Int!)
    id
    @Field(type => Int)
    quantity
    @Field(type => Float)
    totalPrice
    @Field(type => Array<Product>)
    products
    @Field(type => User)
    user
}