import bcrypt from 'bcrypt';
import Users from '../models/Users';

class UserController {
    async verify(req:any, res:any) {
        const user = await Users.findOne({ username: req.body.username }).select('+password');
        
        if(!user){
            return res.status(404).send({message: 'Error: User not Find'});
        }

        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.status(404).send({message: 'Error: User Not find'});
        }

        user.password = undefined;

        res.send({user});
    }
}


export default UserController;