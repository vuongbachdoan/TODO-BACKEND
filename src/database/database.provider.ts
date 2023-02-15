import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> => {
            return mongoose.connect('mongodb+srv://vuongbachdoan:dHhxMRz9oiWHyKmb@cluster0.0tgxh.mongodb.net/todo-db');
        }
    }
]