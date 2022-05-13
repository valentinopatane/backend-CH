//-----------------------REQUIRE & IMPORTS-----------------------//
import express from 'express'; //<---Express
import SQL from './handlers/productClass.js'

import  configMySql from './config/configMySql.js';
import configSqlLite from './config/configSqlLite.js';

const products = new SQL(configMySql,'products')
const messages = new SQL (configSqlLite, 'messages')

import { Server as HttpServer } from 'http'
import { Server as IOServer }  from "socket.io";



const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//-----------------------MIDDLEWARES-----------------------//

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------WEBSOCKET-----------------------//


io.on('connection', async (socket) =>{

    //-------------PRODUCTS-----------------//  
    const productListed = await products.getAll();
       
    socket.emit('showProducts', productListed)

    socket.on('newProduct', product =>{
        products.add(product)
        socket.emit('showProducts', productListed)
    })

    //-------------MESSAGES-----------------//
    const messagesListed = await messages.getAll();

    socket.emit('showMessages', messagesListed)
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