import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AwsUser } from "../dto";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(awsUser: AwsUser): Promise<Object> {
        return {
            access_token: this.jwtService.sign({
                sub: awsUser.id,
                email: awsUser.email,
                role: awsUser.role
            })
        }
    }
}