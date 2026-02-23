import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Inject } from "@nestjs/common";
import { Observable, of, tap } from "rxjs";
import { Order } from "../../ecomerce";
import { DataSource } from "typeorm";

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const idempotencyKey = request.headers['idempotency-key'];
        if(!idempotencyKey) {
            throw new BadRequestException("Missing idempotency key");
        }
        return next.handle();
    }
}