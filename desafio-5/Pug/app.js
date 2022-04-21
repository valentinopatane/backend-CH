//-----------------------REQUIRE & IMPORTS-----------------------//
const express = require('express');
const routerProducts = require('./src/routes/products');  

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------HANDLEBAR CONFIG-----------------------//

app.set('view engine', 'pug');
app.set('views', 'src/views');

//-----------------------ROUTES-----------------------//

app.use('/', routerProducts);

//-----------------------SERVER CONFIG-----------------------//
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`[Server ON] The server is available on the following URL: http://${server.address().port}/`);
})
server.on('error', (error) => console.log(`Server error: ${error}`));
