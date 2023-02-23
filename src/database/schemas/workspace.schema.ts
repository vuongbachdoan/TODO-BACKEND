import * as mongoose from "mongoose";

export const WorkspaceSchema = new mongoose.Schema({
    name: String,
    prefixIcon: String,
    suffixIcon: String,
    colorTheme: String,
    createAt: Date,
    updateAt: Date,
    members: Array<String>,
    ownerId: String
})