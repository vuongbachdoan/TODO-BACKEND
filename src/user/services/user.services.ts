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

    async getOne(email: string) {
        return await this.userModel.findOne({email : {$eq: email}});
    }

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    async update(id: string, data: any) {
        return await this.userModel.updateOne({_id: {$eq: id}}, {data});
    }

    async remove(id: string) {
        return await this.userModel.remove({_id: {$eq: id}});
    }
}