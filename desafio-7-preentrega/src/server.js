//-----------------------REQUIRES & IMPORTS-----------------------//
const express = require('express');
const app = express();
const routerProducts = require('./routers/routerProducts')
const routerCarts = require('./routers/routerCarts')

//-----------------------MIDDLEWARES-----------------------//
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------ROUTES-----------------------//
app.get('/', (req,res)=>{
  res.send(console.log('API Productos'));
});

app.use('/api/productos', routerProducts);
app.use('/api/carritos', routerCarts)




//-----------------------SERVER-----------------------//

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`);
})
server.on('error', (error) => console.log(`Server error: ${error}`));




