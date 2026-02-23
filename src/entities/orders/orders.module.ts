import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "../../../ecomerce";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}