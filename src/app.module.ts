import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "./user/middleware/auth.middleware";
import { UserController } from "./user/controller/user.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
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