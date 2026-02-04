import { Controller, Get, Post, Delete, Body, HttpCode, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../../ecomerce';
import { ZodValidationPipe, createUserSchema } from '../pipes/Pipe';
import { DeleteResult } from 'typeorm';

@Controller('Users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @HttpCode(200)
    getUsers(): Promise<User[] | string> {
        return this.usersService.findAll();
    }

    @Get(':name')
    @HttpCode(200)
    findUserByName(@Param('name') name: string): User | string {
        return this.usersService.findByName(name);
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body(new ZodValidationPipe(createUserSchema)) user: User): Promise<string | User> {
        try {
            return await this.usersService.create(user);
        } catch (err) {
            return err.message;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
        return this.usersService.deleteUser(id);
    }
}