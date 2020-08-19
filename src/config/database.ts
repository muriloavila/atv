import 'dotenv/config';
import mongoose from 'mongoose';

const url = process.env.MONGO_HOST;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

export default mongoose;