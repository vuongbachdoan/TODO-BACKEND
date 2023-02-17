import { BadRequestException, Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/services/user.services";
import * as bcrypt from "bcrypt";
import { UserDto } from "src/user/models/user.dto";
import { jwtConstants } from "../constrants";
import { AuthDto } from "../models/auth.dto";
import { ObjectId } from "mongoose";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService
    ) {}

    async validateUser(user): Promise<any> {
        const userFound = await this.userService.getOne(user.email);
        if(!user) return null;

        const isPasswordValid = await bcrypt.compare(user.password, userFound.password);
        if(userFound && isPasswordValid) {
            return userFound;
        } else {
            return null;
        }
    }

    async getToken(_id: ObjectId, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: _id,
                    email
                },
                {
                    secret: jwtConstants.SECRET,
                    expiresIn: '1h'
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: _id,
                    email
                },
                {
                    secret: jwtConstants.REFRESH_SECRET,
                    expiresIn: '7d'
                }
            )
        ])

        return {
            accessToken,
            refreshToken
        }
    }

    async hashData(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash;
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        
        this.userService.update(userId, {refreshToken: hashedRefreshToken});
    }

    async login(user: AuthDto) : Promise<any> {
        const userFound = await this.userService.getOne(user.email);
        if(!userFound) throw new BadRequestException("User not found");

        const passwordMatches = await bcrypt.compare(user.password, userFound.password);
        if(!passwordMatches) throw new BadRequestException("Invalid password");

        const tokens = await this.getToken(userFound._id, user.email);
        await this.updateRefreshToken(`${userFound._id}`, tokens.refreshToken);

        return {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        }
    }

    async signUp(createUserDto: UserDto) : Promise<any> {
        const userExists = await this.userService.getOne(createUserDto.email);
        if(userExists) {
            throw new BadRequestException("User already exists");
        }

        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hash
        })

        const tokens = await this.getToken(newUser._id, newUser.email);
        this.userService.update(`${newUser._id}`, {refreshToken: tokens.refreshToken})
        return {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        };
    }

    async logout(userId: string) {
        return this.userService.update(userId, {refreshToken: null})
    }
}