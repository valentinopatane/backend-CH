import mongoose from 'mongoose';
import MongoClass from '../handlers/messageMongoClass.js';//<---Message class using Mongoose

const esquema = mongoose.Schema;
const userSchema = new esquema({
    username: String,
    password: String,
    email: String,
  })


export const users = new MongoClass('users', userSchema)