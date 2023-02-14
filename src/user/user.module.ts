import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.services";
import { UserProviders } from "./user.provider";
import { DatabaseModule } from "src/database/database.module";

@Module({
    providers: [UserService, ...UserProviders],
    imports: [DatabaseModule],
    controllers: [UserController],
})
export class UserModule {}