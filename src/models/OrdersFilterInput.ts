import { InputType, Field, Int } from "@nestjs/graphql";
import { OrderStatus } from "../../ecomerce";

@InputType()
export class OrdersFilterInput {
    @Field(() => Int, { nullable: false })
    userId?: number;
    @Field(() => String, { nullable: true })
    status: OrderStatus;
    @Field(() => Date, { nullable: true })
    dateFrom: Date;
    @Field(() => Date, { nullable: true })
    dateTo: Date
}