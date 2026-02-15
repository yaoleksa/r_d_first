import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class OrdersFilterInput {
    @Field(() => Int, { nullable: true })
    userId?: number;
}