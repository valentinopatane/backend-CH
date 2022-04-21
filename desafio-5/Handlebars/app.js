//-----------------------REQUIRE & IMPORTS-----------------------//
const express = require('express');
const engine = require('express-handlebars').engine;
const routerProducts = require('./src/routes/products');  

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------HANDLEBAR CONFIG-----------------------//
const handlebarsConfig = {
  extname: '.hbs',
  defaultLayout: 'index.hbs',
}

app.engine('.hbs', engine(handlebarsConfig));
app.set('view engine', '.hbs');
app.set('views', 'src/views');

//-----------------------ROUTES-----------------------//

app.use('/', routerProducts);

//-----------------------SERVER CONFIG-----------------------//
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`);
})
server.on('error', (error) => console.log(`Server error: ${error}`));
