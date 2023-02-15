import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/services/user.services";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.getOne(email);
        if(user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }
}