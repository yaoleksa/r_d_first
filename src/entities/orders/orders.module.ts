import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "../../../ecomerce";
import { RabbitMQModule } from "../../rabbitmq/rabbitmq.module";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Order]), RabbitMQModule],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}