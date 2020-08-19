import mongoose from '../config/database';

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

const Users = mongoose.model('users', UsersModel);


export default Users;