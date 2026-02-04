import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export class UsersService {
    
    constructor(private dataSource: DataSource) {}

    async create(user: User): Promise<User | string> {
        const queryRunner = await this.dataSource.createQueryRunner();
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
    async findAll(): Promise<User[] | string> {
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const usersList = await queryRunner.manager.find(User);
            await queryRunner.commitTransaction();
            return usersList;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            return err.message;
        } finally {
            // Avoid ECONNREFUSED / too many connections ERROR
            await queryRunner.release();
        }
    }
    async deleteUser(id: number): Promise<string> {
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(User, id);
            await queryRunner.commitTransaction();
        } catch(err) {
            await queryRunner.rollbackTransaction();
            return err.message;
        } finally {
            // Avoid ECONNREFUSED / too many connections ERROR
            await queryRunner.release();
        }
    }
}