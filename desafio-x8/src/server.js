import { Server as HttpServer } from 'http'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import productsRoutes from '../routes/products-route.js'
import usersRoutes from '../routes/users-route.js'
import cartsRoutes from '../routes/carts-route.js'
import ordersRoutes from '../routes/orders-route.js'

/* Server express */

const app = express();

/* Basic Middlewares */ 

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(express.static('public'))
app.use(cors())

/* Server basics */

const httpServer = new HttpServer(app)
dotenv.config()

/* ----------Routes---------- */


app.get('/', (req, res) => {
  res.send('Server running.')
})

/* Products */
app.use('/api/products', productsRoutes)

/* Users */
app.use('/user', usersRoutes)

/* Carts */
app.use('/carts', cartsRoutes)

/* Orders */
app.use('/orders', ordersRoutes)




/* Mongo DB */
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Database running.'))
.catch((error) => console.log(error))

/* Server run */
export function crearServidor(PORT) {
    const server = httpServer.listen(PORT, () => {
      console.log(`Server running on port: ${PORT} -- Worker ${process.pid} started`)
    })
    server.on("error", error => console.log(`Error en servidor: ${error}`))
}

