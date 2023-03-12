import { Module } from "@nestjs/common";
import { TaskProviders } from "./task.provider";
import { TaskController } from "./controller/task.controller";
import { TaskService } from "./service/task.service";
import { DatabaseModule } from "src/database/database.module";
import { WorkspaceProviders } from "src/workspace/workspace.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [...TaskProviders, TaskService, ...WorkspaceProviders],
    exports: [TaskService]
})

export class TaskModule {}