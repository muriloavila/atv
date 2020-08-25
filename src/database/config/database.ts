import 'dotenv/config';
import mongoose from 'mongoose';

const url = process.env.MONGO_HOST || '';


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, user: process.env.MONGO_USERNAME, pass: process.env.MONGO_PASS});
mongoose.Promise = global.Promise;

export default mongoose;