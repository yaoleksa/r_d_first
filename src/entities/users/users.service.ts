import { Injectable } from "@nestjs/common";
import { User } from "../../../ecomerce";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    private readonly users: User[] = [];
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    create(user: User): string {
        this.users.push(user);
        return 'User has been created successfuly';
    }
    findByName(name: string): User | string {
        for(let person of this.users) {
            if(person.lastName.match(new RegExp(`${name}`, 'ig'))) {
                return person;
            }
        }
        return 'User with such name has not been found';
    }
    removeByName(name: string): string {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].lastName.match(new RegExp(`${name}`, 'ig'))) {
                this.users.splice(i, 1);
                return 'User was successfully removed';
            } 
        }
        return 'There is no user with such name';
    }
    findAll(): User[] {
        return this.users;
    }
}