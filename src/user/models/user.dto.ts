import { ObjectId } from "mongoose";

export interface UserDto {
    _id: ObjectId;
    workspaces: ObjectId[];
    email: string;
    password: string;
    refreshToken: string;
}