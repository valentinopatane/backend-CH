//-----------------------REQUIRE & IMPORTS-----------------------//
const express = require('express'); //<---Express
const Cont = require ('./handlers/productClass')
const products = new Cont('products')
const messages = new Cont ('messages')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

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
        io.sockets.emit('showProducts', productListed)
    })

    //-------------MESSAGES-----------------//
    const messagesListed = await messages.getAll();

    socket.emit('showMessages', messagesListed)
    socket.on('newMessage', message =>{
        messages.add(message)
        io.sockets.emit('showMessages',messagesListed)
    })

})

//-----------------------SERVER CONFIG-----------------------//

const server = httpServer.listen(8080, ()=>{
    console.log(`Server hosted on http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`));