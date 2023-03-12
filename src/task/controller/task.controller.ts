import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Request, Res } from "@nestjs/common"
import { Response } from "express";
import { TaskService } from "../service/task.service";
import { TaskCreateDto } from "../models/task-create.dto";
import { WorkspaceService } from "src/workspace/service/workspace.service";

@Controller('api/v1/app/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get(':workspaceId')
    getTasks(@Param('workspaceId') workspaceId: string, @Res() res: Response) {
        this.taskService.getTasks(workspaceId)
            .then(
                (out) => res.status(HttpStatus.OK).json(out)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }

    @Patch()
    createTask(@Body() data: TaskCreateDto, @Res() res: Response) {
        this.taskService.create(data)
            .then(
                async () => {
                    const tasks = await  this.taskService.getTasks(data.workspaceId)
                    return res.status(HttpStatus.OK).json(tasks)
                }
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }

    @Delete(':workspaceId/:taskId')
    deleteTask(@Param() params, @Res() res: Response) {
        this.taskService.delete(
            params.workspaceId,
            params.taskId
        )
            .then(
                (out) => res.status(HttpStatus.OK).json(out)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }
}