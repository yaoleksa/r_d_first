import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductModel {
    @Field(type => Int)
    id: number;
    @Field(type => String)
    title: String;
    @Field(type => String)
    description: string;
    @Field(type => Float)
    price: number;
}