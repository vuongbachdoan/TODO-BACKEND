import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { Workspace } from "../models/workspace.interface";
import { WorkspaceCreateDto } from "../models/workspace-create.dto";
import { User } from "src/user/models/user.interface";

@Injectable()
export class WorkspaceService {
    constructor(
        @Inject('WORKSPACE_MODEL') private workspaceModel: Model<Workspace>
    ) {}

    async create(workspace: WorkspaceCreateDto) {
        const newWorkspace = new this.workspaceModel({
            ...workspace,
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [workspace.ownerId],
        });
        return await newWorkspace.save();
    }

    async getWorkspaces(id: string) {
        const foundedWorkspace = await this.workspaceModel.find({
            $or: [
                {ownerId: {$eq: id}},
                {member: id},
            ]
        })
        return foundedWorkspace;
    }
}