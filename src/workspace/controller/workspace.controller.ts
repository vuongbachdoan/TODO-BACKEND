import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Res} from "@nestjs/common"
import { Response } from "express";
import { WorkspaceService } from "../service/workspace.service";
import { WorkspaceCreateDto } from "../models/workspace-create.dto";

@Controller('api/v1/app/workspaces')
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) {}

    @Get(':id')
    getWorkspace (@Param('id') id: string, @Res() res: Response) {
        this.workspaceService.getWorkspaces(id)
            .then(
                (out) => res.status(HttpStatus.OK).json(out)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }

    @Post()
    createWorkspace (@Body() data: WorkspaceCreateDto, @Res() res: Response) {
        this.workspaceService.create(data)
            .then(
                (out) => res.status(HttpStatus.OK).json(out)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }

    @Delete(":workspaceId")
    deleteWorkspace(@Param("workspaceId") workspaceId: string, @Res() res: Response) {
        this.workspaceService.deleteWorkspace(workspaceId)
            .then(
                (out) => res.status(HttpStatus.OK).json(out)
            )
            .catch(
                (err) => res.status(HttpStatus.BAD_REQUEST).json(err)
            );
    }
}