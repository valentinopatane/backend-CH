import mongoose from 'mongoose';
import MongoClass from '../handlers/messageMongoClass.js';//<---Message class using Mongoose


const esquema = mongoose.Schema;
const messageSchema = new esquema({
    author:{
        id:  String,
        name: String,
        lastname: String,
        age: Number,
        alias: String,
        avatar: String,
    },
    text: String
})

export const messages = new MongoClass('messages', messageSchema)