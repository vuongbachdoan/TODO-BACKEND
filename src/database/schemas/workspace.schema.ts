import * as mongoose from "mongoose";
import { TaskSchema } from "./task.schema";

export const WorkspaceSchema = new mongoose.Schema({
    name: String,
    prefixIcon: String,
    suffixIcon: String,
    colorTheme: String,
    createAt: Date,
    updateAt: Date,
    members: Array<String>,
    ownerId: String,
    tasks: [TaskSchema]
})