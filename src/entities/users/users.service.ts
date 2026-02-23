import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { DataSource, DeleteResult, QueryRunner } from "typeorm";

@Injectable()
export class UsersService {
    
    constructor(private dataSource: DataSource) {}

    async create(user: User): Promise<User> {
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newUser = await queryRunner.manager.create(User, user);
            const savedUser = await queryRunner.manager.save(newUser);
            await queryRunner.commitTransaction();
            return savedUser;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            // Avoid ECONNREFUSED / too many connections ERROR
            await queryRunner.release();
        }
    }
    async findOne(id: number): Promise<User> {
        return await this.dataSource.getRepository(User).findOne({
            where: {
                id
            }
        });
    }
    async findAll(): Promise<User[]> {
        return await this.dataSource.getRepository(User).find()
    }
    async deleteUser(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(User).delete(id);
    }
}