import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodType, z } from "zod";
import { User } from "../../../ecomerce";

class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: ZodType<T>) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const newInstance = this.schema.safeParse(value);
        if(!newInstance.success) {
            throw new BadRequestException(`Invalid ${metadata.metatype.toString().split(' ')[1]} payload`);
        }
        return newInstance.data;
    }
}

const createUserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    age: z.number().int(),
    email: z.string()
});

const createProductSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number()
});

const createOrderSchema = z.object({
    quantity: z.number().int().positive(),
    products: z.array(createProductSchema).nonempty(),
    userId: z.number().int().positive()
});

export { ZodValidationPipe, createUserSchema, createProductSchema };