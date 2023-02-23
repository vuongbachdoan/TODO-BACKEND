import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "./user/middleware/auth.middleware";
import { UserController } from "./user/controller/user.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { WorkspaceModule } from "./workspace/workspace.module";

@Module({
    imports: [
        UserModule,
        AuthModule,
        WorkspaceModule,
        ConfigModule.forRoot({isGlobal: true})
    ]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UserController)
    }
}