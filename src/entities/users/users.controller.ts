import { Controller, Get, Post, Delete, Body, HttpCode, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../../ecomerce';

@Controller('Users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @HttpCode(200)
    getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':name')
    @HttpCode(200)
    findUserByName(@Param('name') name: string): User | string {
        return this.usersService.findByName(name);
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() user: User): string {
       return this.usersService.create(user);
    }

    @Delete(':name')
    @HttpCode(204)
    deleteUser(@Param('name') name: string): string {
        return this.usersService.removeByName(name);
    }
}