import { Controller, Get, Post, Delete, Body, HttpCode, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../../ecomerce';
import { ZodValidationPipe, createUserSchema } from '../pipes/Pipe';
import { DeleteResult } from 'typeorm';

@Controller('Users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @HttpCode(200)
    async getUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    async findUserById(@Param('id') id: number): Promise<User> {
        const targetUser = await this.usersService.findOne(id);
        if(!targetUser) {
            throw new HttpException('There is no such user!', HttpStatus.NOT_FOUND);
        }
        return targetUser;
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body(new ZodValidationPipe(createUserSchema)) user: User): Promise<User> {
        try {
            return await this.usersService.create(user);
        } catch (err) {
            throw err;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
        return this.usersService.deleteUser(id);
    }
}