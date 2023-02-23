import {Body, Controller, Get, HttpStatus, Post, Res} from "@nestjs/common"
import { Response } from "express";
import { WorkspaceService } from "../service/workspace.service";
import { WorkspaceCreateDto } from "../models/workspace-create.dto";

@Controller('api/v1/app/workspaces')
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) {}

    @Get()
    getWorkspace (@Body() data, @Res() res: Response) {
        this.workspaceService.getWorkspaces(data.id)
            .then(
                (data) => res.status(HttpStatus.OK).json(data)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }

    @Post()
    createWorkspace (@Body() data: WorkspaceCreateDto, @Res() res: Response) {
        this.workspaceService.create(data)
            .then(
                (data) => res.status(HttpStatus.OK).json(data)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }
}