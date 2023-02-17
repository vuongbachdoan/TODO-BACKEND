import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
          });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = {
            email: username,
            password: password
        }
        const foundUser = await this.authService.validateUser(user);
        if(!foundUser) {
            throw new UnauthorizedException();
        } else {
            return foundUser;
        }
    }
}