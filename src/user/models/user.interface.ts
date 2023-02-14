import { Document, ObjectId } from "mongoose";

export interface User extends Document{
    readonly _id: ObjectId;
    readonly email: string;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly expire: Date;
}