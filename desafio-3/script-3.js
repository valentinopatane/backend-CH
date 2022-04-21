const fs = require('fs');
const express = require('express');
const app = express();

//////////////////////////////
class Contenedor{
    async getAll(){
        const data = await fs.promises.readFile('desafio-3/productos.txt','utf-8')
        const array = JSON.parse(data)
        return array
    }
}
const contenedor = new Contenedor();
//////////////////////////////

app.get('/', (req,res)=>{
    res.send('Bienvenido');
})
app.get('/productos', async (req,res)=>{
    let arrayProductos = await contenedor.getAll();
    res.send(arrayProductos);
})
app.get('/productoRandom', async (req,res)=>{
    let arrayProductos = await contenedor.getAll();
    let randomProductID = Math.round((Math.random()*(arrayProductos.length - 1)));
    let rProduct = arrayProductos[randomProductID];
    res.send(rProduct);
});

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http en el puerto ${server.address().port}`);
});

