import { Document, ObjectId } from "mongoose";

export interface Workspace extends Document{
    readonly _id: ObjectId;
    readonly tasks: ObjectId[];
    readonly createAt: Date;
    readonly updateAt: Date;
    readonly name: string;
    readonly suffixIcon: string;
    readonly prefixIcon: string;
}