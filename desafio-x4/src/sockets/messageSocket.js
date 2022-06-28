import { messages } from '../class/messageClass.js';

import { normalize,schema } from "normalizr";//<---Normalizer,used on socket

export async function messageSocket(socket){
    const messagesListed = await messages.getAll();

    const authorSchema = new schema.Entity('authors')
    
    const messageSchema = new schema.Entity('messages', {
        author: authorSchema,
    }, {idAttribute:'_id'})
    
    const normalizedMessages = normalize(messagesListed, [messageSchema])
    
    socket.emit('showMessages', normalizedMessages)
    socket.on('newMessage', message =>{
        messages.add(message)
        socket.emit('showMessages',messagesListed)
    })
}



