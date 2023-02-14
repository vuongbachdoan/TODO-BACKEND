import { Connection } from "mongoose";
import { UserSchema } from "src/database/schemas/user.schema";

export const UserProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => {
            return connection.model('User', UserSchema);
        },
        inject: ['DATABASE_CONNECTION'],
    }
]