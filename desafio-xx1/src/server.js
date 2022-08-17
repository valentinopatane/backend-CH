import { Server as HttpServer } from "http";
import express from "express";
import runDb from "../database/db.js";
import bodyParser from "body-parser";
import cors from "cors";

import { graphqlMiddleware } from "../middleware/graphQL.js";

// import productsRoutes from "../routes/products-route.js";
// import usersRoutes from '../routes/users-route.js'
// import cartsRoutes from '../routes/carts-route.js'
// import ordersRoutes from '../routes/orders-route.js'

/* ----------Server express---------- */

const app = express();

/* ----------Basic Middlewares---------- */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cors());

/* Server basics */

const httpServer = new HttpServer(app);

/* ----------Routes---------- */

app.get("/", (req, res) => res.send("Server running."));

/* Products */
app.use("/graphql", graphqlMiddleware);
// app.use('/api/products', productsRoutes)

/* Users */
// app.use('/api/users', usersRoutes)

/* Carts */
// app.use('/api/carts', cartsRoutes)

/* Orders */
// app.use('/api/orders', ordersRoutes)

/* ----------Server run---------- */

export function crearServidor(PORT) {
    runDb();
    const server = httpServer.listen(PORT, () => {
        console.log(
            `Server running on port: ${PORT} -- Worker ${process.pid} started`
        );
    });
    server.on("error", (error) => console.log(`Error en servidor: ${error}`));
}
