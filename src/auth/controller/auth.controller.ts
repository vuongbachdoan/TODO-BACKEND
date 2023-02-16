import { Controller, UseGuards, Post, Get, Body } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserDto } from "src/user/models/user.dto";
import { AuthDto } from "../models/auth.dto";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @Post('/log-in')
    async login(@Body() user: AuthDto) {
        return this.authService.login(user);
    }

    // @UseGuards(AuthGuard('local'))
    @Post('/sign-up')
    async signUp(@Body() createUserDto: UserDto) {
        return this.authService.signUp(createUserDto);
    }

    // @UseGuards(AuthGuard('local'))
    @Get('/log-out')
    async logout(@Body() userId: string) {
        return this.authService.logout(userId);
    }
}