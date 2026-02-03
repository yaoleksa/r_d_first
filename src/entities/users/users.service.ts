import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(user: User): Promise<string> {
        try {
            const newUser = this.userRepository.create(user);
            this.userRepository.save(newUser);
        } catch(err) {
            return err.message;
        }
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
    async deleteUser(id: number): Promise<string> {
        await this.userRepository.delete(id);
        return 'User has been deleted';
    }
}