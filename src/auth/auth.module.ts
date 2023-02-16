import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { jwtConstants } from "./constrants";
import { UserService } from "src/user/services/user.services";

@Module({
    imports: [
        UserModule,
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.SECRET,
            signOptions: {
                expiresIn: "1d"
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}