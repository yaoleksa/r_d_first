import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "../guards/jwt.strategy";

@Module({
    imports: [JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: '45m'
            }
        })
    })],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}