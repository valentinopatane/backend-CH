const express = require('express');
const { Router } = express;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.send(console.log('API Productos'));
});

const productos = [];
let generadorID = 1

const routerProductos = new Router();

routerProductos.get('/',(req,res)=>{
    res.json(productos);
});

routerProductos.get('/:id',(req,res)=>{
    const id = req.params.id;
    let productoSeleccionado = productos.find( producto => producto.id == id )

    function responseProduct(productoSeleccionado){
        if(productoSeleccionado === undefined){
            return {error: 'El producto no existe'}
        }else{
            return productoSeleccionado
        }
    }
    res.json(responseProduct(productoSeleccionado));
});

routerProductos.post('/',(req,res)=>{
    let productoRecibido = req.body;
    productoRecibido.id = generadorID;
    generadorID++;
    productos.push(productoRecibido);
    res.send(productos);
});

routerProductos.put('/:id',(req,res)=>{
    let id = req.params.id;
    let productoSeleccionado = productos.find( producto => producto.id == id )

    function editProduct(productoSeleccionado){
        if(productoSeleccionado === undefined){
            return {error: 'El producto no existe'}
        }else{
            productoSeleccionado.nombre = req.body.nombre
            productoSeleccionado.precio = req.body.precio
            productoSeleccionado.thumbnail = req.body.thumbnail

            return productoSeleccionado
        }
    }
    res.json(editProduct(productoSeleccionado));
});

routerProductos.delete('/:id',(req,res)=>{
    const id = req.params.id;
    let productoSeleccionado = productos.find( producto => producto.id == id )

    function responseProduct(productoSeleccionado){
        if(productoSeleccionado === undefined){
            return {error: 'El producto no existe'}
        }else{
            let index = productos.indexOf(productoSeleccionado)
            productos.splice(index, 1)
            console.log(productos)
            return 'Producto eliminado'
        }
    }
    res.json(responseProduct(productoSeleccionado));
});

app.use('/api/productos', routerProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http en el puerto ${server.address().port}`);
});
server.on("error", error => console.log('Error ' + error));
