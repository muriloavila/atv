import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

class UserController {
    async login(req:any, res:any) {
        const user = await Users.findOne({ username: req.query.username }).select('+password');
        
        if(!user){
            return res.status(401).send({message: 'Error: User not Find'});
        }

        if(!await bcrypt.compare(req.query.password, user.password)){
            return res.status(401).send({message: 'Error: User Not find'});
        }

        user.password = '';

        const token = jwt.sign({id: user.id,}, (process.env.SECRET || ''), {
            expiresIn: 86400
        });

        res.send({user, token});
    }

    async verify(req:any, res:any){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.send({error: 'Error, No Token Provider'});
        }

        const parts = authHeader.split(' ');

        if(parts.length != 2){
            return res.send({error: 'Error, Token error'});
        }

        const [schema, token] = parts;

        if(!/^Bearer$/i.test(schema)){
            return res.send({error: 'Error, Malformatted Token'});
        }

        jwt.verify(token, (process.env.SECRET || ''), (err:any, decoded:any) => {
            if(err) {
                return res.send({error: 'Error, Invalid Token'});
            }

            res.send({decoded: decoded});
        });
    }
}


export default UserController;