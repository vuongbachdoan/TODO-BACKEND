import { Document, ObjectId } from "mongoose";

export interface Task extends Document{
    readonly _id: ObjectId;
    readonly name: string;
    readonly description: string;
    readonly dueDate: Date;
    readonly reminder: Date;
    readonly tags: string[];
}

