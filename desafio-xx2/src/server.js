import { Server as HttpServer } from "http";
import express from "express";
// import runDb from "../database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import RouterKOA from "koa-router";
// import { graphqlMiddleware } from "../middleware/graphQL.js";

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

// products.js
const Router = RouterKOA();

// Prefix all routes with /products
const router = new Router({
    prefix: "/products",
});

let products = [
    { id: 101, name: "Apple", price: "15" },
    { id: 102, name: "Grape", price: "50" },
    { id: 103, name: "Watermelon", price: "200" },
    { id: 104, name: "Orange", price: "160" },
];

/* ---------------------- Routes ----------------------- */
/* API REST Get All */
router.get("/", (ctx, next) => {
    ctx.body = {
        status: "success",
        message: products,
    };
    next();
});

/* API REST Get x ID */
router.get("/:id", (ctx, next) => {
    let getCurrentProduct = products.filter(function (product) {
        if (product.id == ctx.params.id) {
            return true;
        }
    });

    if (getCurrentProduct.length) {
        ctx.body = getCurrentProduct[0];
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: "error!",
            message: "Product Not Found with that id!",
        };
    }
    next();
});

/* API REST Post */
router.post("/new", (ctx, next) => {
    // Check if any of the data field not empty
    if (
        !ctx.request.body.id ||
        !ctx.request.body.name ||
        !ctx.request.body.price
    ) {
        ctx.response.status = 400;
        ctx.body = {
            status: "error",
            message: "Please enter the data",
        };
    } else {
        let newProduct = products.push({
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            price: ctx.request.body.price,
        });
        ctx.response.status = 201;
        ctx.body = {
            status: "success",
            message: `New product added with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
        };
    }
    next();
});

/* API REST Put */
router.put("/update/:id", (ctx, next) => {
    // Check if any of the data field not empty
    if (
        !ctx.request.body.id ||
        !ctx.request.body.name ||
        !ctx.request.body.price
    ) {
        ctx.response.status = 400;
        ctx.body = {
            status: "error",
            message: "Please enter the data",
        };
    } else {
        let id = ctx.params.id;
        let index = products.findIndex((product) => product.id == id);
        products.splice(index, 1, ctx.request.body);
        ctx.response.status = 201;
        ctx.body = {
            status: "success",
            message: `New product updated with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
        };
    }
    next();
});

/* API REST Delete */
router.delete("/delete/:id", (ctx, next) => {
    let id = ctx.params.id;
    let index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
    ctx.response.status = 200;
    ctx.body = {
        status: "success",
        message: `Product deleted with id: ${id}`,
    };
    next();
});

/* ----------Server run---------- */

export function crearServidor(PORT) {
    // runDb();
    const server = httpServer.listen(PORT, () => {
        console.log(
            `Server running on port: ${PORT} -- Worker ${process.pid} started`
        );
    });
    server.on("error", (error) => console.log(`Error en servidor: ${error}`));
}
