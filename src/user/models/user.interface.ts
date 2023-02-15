import { Document, ObjectId } from "mongoose";

export interface User extends Document{
    readonly _id: ObjectId;
    readonly email: string;
    readonly workspaces: ObjectId[];
    readonly createAt: Date;
    readonly updateAt: Date;
}