import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "../services/user.services";
import { AuthGuard } from "@nestjs/passport";

@Controller('/api/v1/account')
export class UserController {
    constructor(private userService: UserService) { }

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
            );
    }

    @UseGuards(AuthGuard('local'))
    @Post()
    create(@Body() user: any, @Res() res: Response): void {
        this.userService.create(user)
            .then(
                (val) => res.status(HttpStatus.OK).json(val)
            )
            .catch(
                (err) => res.status(HttpStatus.EXPECTATION_FAILED).json(err)
            );
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: any, @Res() res: Response): void {
        this.userService.update(id, user)
            .then(
                (val) => res.status(HttpStatus.OK).json(val)
            )
            .catch(
                (err) => res.status(HttpStatus.EXPECTATION_FAILED).json(err)
            );
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response): void {
        this.userService.remove(id)
            .then(
                (val) => res.status(HttpStatus.OK).json(val)
            )
            .catch(
                (err) => res.status(HttpStatus.EXPECTATION_FAILED).json(err)
            );
    }
}