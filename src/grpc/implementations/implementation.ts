import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../../database/models/Users';

export default {
    async validToken(call:any, callback:any) {
        
        const { authHeader } = call.request;

        if(!authHeader){
            return callback({message: 'Token Not Provide'});
        }
        
        const parts = authHeader.split(' ');
        
        if(parts.length != 2){
            return callback({message: 'Token malformmated'});
        }
        const [schema, token] = parts;

        if(!/^Bearer$/i.test(schema)){
            return callback.send({message: 'Malformatted Token'});
        }
        
        await jwt.verify(token, (process.env.SECRET || ''), async (err:any, decoded:any) => {
            
            if(err) return callback({
                code: 401,
                message: "Error validating access token"
            });

            if(!decoded.id) return callback({message: 'Undentified User'});
            const user = await User.findById(decoded.id).select('+password');
            if(user) user.password = '';
            return callback(null, {user});
        });
    }
}