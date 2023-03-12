import { Workspace } from 'src/workspace/models/workspace.interface';
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { WorkspaceCreateDto } from '../models/workspace-create.dto';

@Injectable()
export class WorkspaceService {
    constructor(
        @Inject('WORKSPACE_MODEL') private workspaceModel: Model<Workspace>
    ) {}

    async create(workspace: WorkspaceCreateDto) {
        console.log(workspace)
        const newWorkspace = new this.workspaceModel({
            ...workspace,
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [workspace.ownerId],
        });
        return await newWorkspace.save();
    }

    async getWorkspaces(id: string) {
        const workspaces = await this.workspaceModel.find({
            $or: [
                {ownerId: {$eq: id}},
                {member: id},
            ]
        })
        return workspaces;
    }

    async deleteWorkspace(workspaceId: string) {
        const workspaces = await this.workspaceModel.findByIdAndDelete(workspaceId);
        return workspaces;
    }
}