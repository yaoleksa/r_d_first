import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { DataSource, DeleteResult, QueryRunner } from "typeorm";

@Injectable()
export class UsersService {
    
    constructor(private dataSource: DataSource) {}

    async create(user: User): Promise<User | string> {
        const queryRunner: QueryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newUser = await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            return newUser;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            return err.message;
        } finally {
            // Avoid ECONNREFUSED / too many connections ERROR
            await queryRunner.release();
        }
    }
    findByName(name: string): User | string {
        
        return 'User with such name has not been found';
    }
    removeByName(name: string): string {
        
        return 'There is no user with such name';
    }
    async findAll(): Promise<User[]> {
        return this.dataSource.getRepository(User).find()
    }
    async deleteUser(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(User).delete(id);
    }
}