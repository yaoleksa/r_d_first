import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodType, z } from "zod";

class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: ZodType<T>) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const newUser = this.schema.safeParse(value);
        if(!newUser.success) {
            throw new BadRequestException("Invalid User payload");
        }
        return newUser.data;
    }
}

const createUserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    age: z.number().int(),
    email: z.string()
});

export { ZodValidationPipe, createUserSchema };