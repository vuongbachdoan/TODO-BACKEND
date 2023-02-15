import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Render, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('/api/v1/app/workspace')
export class WorkspaceController {
    // constructor(private userService: UserService) { }

    @Get(':id')
    getOne(@Param() id: string, @Res() res: Response): void {
        res.status(HttpStatus.OK).json(this.userService.getOne(id));
    }

    @Get()
    getAll(@Res() res: Response): void {
        this.userService.getAll()
            .then(
                (val) => res.status(HttpStatus.OK).json(val)
            )
            .catch(
                (err) => res.status(HttpStatus.EXPECTATION_FAILED).json(err)
            )
    }

    @Post()
    create(@Body() user: any, @Res() res: Response): void {
        this.userService.create(user)
            .then(
                (val) => res.status(HttpStatus.OK).json(val)
            )
            .catch(
                (err) => res.status(HttpStatus.EXPECTATION_FAILED).json(err)
            )
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: any, @Res() res: Response): void {
        res.status(HttpStatus.OK).json(this.userService.update(id, user));
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response): void {
        res.status(HttpStatus.OK).json(this.userService.remove(id));
    }
}