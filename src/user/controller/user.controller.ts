import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "../services/user.services";

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    getOne(@Param() id: string, @Res() res: Response) : void {
        res.status(HttpStatus.OK).json(this.userService.getOne(id));
    }

    @Get() 
    getAll(@Res() res: Response) : void {
        res.status(HttpStatus.OK).json(this.userService.getAll());
    }

    @Post()
    create(@Body() user: any, @Res() res: Response) : void {
        res.status(HttpStatus.OK).json(this.userService.create(user));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: any, @Res() res: Response): void {
        res.status(HttpStatus.OK).json(this.userService.update(id, user));
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) : void {
        res.status(HttpStatus.OK).json(this.userService.remove(id));
    }
}