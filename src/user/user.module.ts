import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.services";
import { UserProviders } from "./user.provider";
import { DatabaseModule } from "src/database/database.module";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        DatabaseModule, 
        PassportModule
    ],
    controllers: [UserController],
    providers: [UserService, ...UserProviders, JwtStrategy],
    exports: [UserService]
})
export class UserModule {}