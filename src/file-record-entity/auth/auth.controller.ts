import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AwsUser } from "../dto";

@Controller('/files/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() user: AwsUser): Promise<Object> {
        return await this.authService.login(user);
    }
}