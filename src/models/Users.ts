import { Model } from 'mongoose';
import mongoose from '../config/database';
import { IUserModel } from '../Interfaces/IUserModel';

const UsersModel = new mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    }
})

const Users = mongoose.model<IUserModel, Model<IUserModel> >('users', UsersModel);


export default Users;