import { Module } from "@nestjs/common";
import { WorkspaceProviders } from "./workspace.provider";
import { WorkspaceController } from "./controller/workspace.controller";
import { WorkspaceService } from "./service/workspace.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [WorkspaceController],
    providers: [...WorkspaceProviders, WorkspaceService],
    exports: [WorkspaceService]
})

export class WorkspaceModule {}