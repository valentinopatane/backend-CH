//-----------------------REQUIRE & IMPORTS-----------------------//
import express from 'express'; //<---Express
import { Server as HttpServer } from 'http'
import { Server as IOServer }  from "socket.io";

import SQL from './handlers/productClass.js'
import MongoClass from './handlers/messageMongoClass.js';

import  configMySql from './config/configMySql.js';

import util from 'util'

const products = new SQL(configMySql,'products')


import mongoose from 'mongoose';
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


const messages = new MongoClass('messages', messageSchema)

import fakerRouter from './router/fakerRouter.js'

import { normalize,schema } from "normalizr";


const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//-----------------------MIDDLEWARES-----------------------//

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', fakerRouter)

//-----------------------WEBSOCKET-----------------------//


io.on('connection', async (socket) =>{

    //-------------PRODUCTS-----------------//  
    const productListed = await products.getAll();
       
    socket.emit('showProducts', productListed)

    socket.on('newProduct', product =>{
        products.add(product)
        socket.emit('showProducts', productListed)
    })
//
    //-------------MESSAGES-----------------//
    const messagesListed = await messages.getAll();

    const authorSchema = new schema.Entity('authors')

    const messageSchema = new schema.Entity('messages', {
        author: authorSchema,
    }, {idAttribute:'_id'})

    // const chatSchema = new schema.Entity('chats', {
    //     messages: [messageSchema]
    // })    

    const normalizedMessages = normalize(messagesListed, [messageSchema])
    // const normalizedMessages = normalize({ id: '1', messages: messagesListed }, chatSchema)

    console.log(util.inspect(normalizedMessages, false, 12, true))

    socket.emit('showMessages', normalizedMessages)
    socket.on('newMessage', message =>{
        messages.add(message)
        socket.emit('showMessages',messagesListed)
    })

})

//-----------------------SERVER CONFIG-----------------------//

const server = httpServer.listen(8080, ()=>{
    console.log(`Server hosted on http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`));