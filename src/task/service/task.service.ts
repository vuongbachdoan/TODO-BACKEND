import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { Task } from "../models/task.interface";
import { TaskCreateDto } from "../models/task-create.dto";
import { Workspace } from "src/workspace/models/workspace.interface";

@Injectable()
export class TaskService {
    constructor(
        @Inject('WORKSPACE_MODEL') private workspaceModel: Model<Workspace>
    ) { }

    async create(task) {
        console.log(task)
        const updatedTask = await this.workspaceModel.findOneAndUpdate(
            {
                _id: { $eq: task.workspaceId }
            },
            {
                $push: {
                    tasks: task
                }
            }
        );
        return updatedTask;
    }

    async getTasks(findId: string) {
        const foundedTask = await this.workspaceModel.findById(findId);
        return foundedTask;
    }

    async delete(workspaceId: string, taskId: string) {
        const tasks = await this.workspaceModel.updateOne(
            { _id: workspaceId },
            {
                $pull: {
                    tasks: { _id: taskId }
                }
            }
        );
        console.log(tasks);
        return tasks;
    }
}