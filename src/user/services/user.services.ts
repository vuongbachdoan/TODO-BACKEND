import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "../models/user.dto";
import { User } from "../models/user.interface";
import { Model } from "mongoose";

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_MODEL') private userModel: Model<User>
    ){}

    async create(user: UserDto) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    getOne(email: string) : any {
        return this.userModel.find({email : {$eq: email}});
    }

    getAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    update(id: string, user: any) {
        return this.userModel.updateOne({_id: {$eq: id}}, {user});
    }

    remove(id: string) {
        return this.userModel.remove({_id: {$eq: id}});
    }
}