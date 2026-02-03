import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    create(user: User): string {
        this.userRepository.create(user);
        return 'User has been created successfuly';
    }
    findByName(name: string): User | string {
        
        return 'User with such name has not been found';
    }
    removeByName(name: string): string {
        
        return 'There is no user with such name';
    }
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}