import { Document } from 'mongoose';

export interface IUserModel extends Document {
    name: string,
    username: string,
    password: string
}