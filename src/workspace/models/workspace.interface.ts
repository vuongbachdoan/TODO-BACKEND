import { Document, ObjectId } from "mongoose";

export interface Workspace extends Document{
    readonly _id: ObjectId,
    readonly name: string,
    readonly prefixIcon: string,
    readonly suffixIcon: string,
    readonly colorTheme: string,
    readonly members: Array<string>,
    readonly ownerId: string
}