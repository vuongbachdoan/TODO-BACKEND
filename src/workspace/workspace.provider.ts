import { Connection } from "mongoose";
import { UserSchema } from "src/database/schemas/user.schema";
import { WorkspaceSchema } from "src/database/schemas/workspace.schema";

export const WorkspaceProviders = [
    {
        provide: 'WORKSPACE_MODEL',
        useFactory: (connection: Connection) => {
            return connection.model('Workspace', WorkspaceSchema);
        },
        inject: ['DATABASE_CONNECTION'],
    }
]