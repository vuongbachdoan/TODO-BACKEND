import { Connection } from "mongoose";
import { TaskSchema } from "src/database/schemas/task.schema";

export const TaskProviders = [
    {
        provide: 'TASK_MODEL',
        useFactory: (connection: Connection) => {
            return connection.model('Task', TaskSchema);
        },
        inject: ['DATABASE_CONNECTION'],
    }
]