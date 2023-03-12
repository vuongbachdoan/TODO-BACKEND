import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { jwtConstants } from "../constrants";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return {...payload, refreshToken};
    }
}