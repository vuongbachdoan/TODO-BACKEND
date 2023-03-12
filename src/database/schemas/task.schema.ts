import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    workspaceId: String,
    createAt: Date,
    updateAt: Date,
    title: String,
    description: String,
    status: String,
    reminder: Date,
    dueDate: Date,
    assigneeId: String,
    assigneeName: String,
    assigneeAvatar: String,
    order: Number
});