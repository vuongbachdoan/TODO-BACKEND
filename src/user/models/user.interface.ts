import { Document, ObjectId } from "mongoose";

export interface User extends Document{
    readonly _id: ObjectId;
    readonly email: string;
    readonly workspaces: ObjectId[];
    readonly password: string;
    readonly refreshToken: string;
}