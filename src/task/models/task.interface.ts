import { Document, ObjectId } from "mongoose";

export interface Task extends Document{
    readonly _id: ObjectId,
    readonly workspaceId: string,
    readonly title: string,
    readonly description: string,
    readonly dueDate: Date,
    readonly reminder: Date,
    readonly tag: string,
    readonly order: number
}