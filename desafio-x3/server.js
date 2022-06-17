import express from 'express'
import { Server as HttpServer } from 'http' //<---Server http
import { Server as IOServer }  from "socket.io"; //<---Socket
import mongoose from 'mongoose';

//----------CONFIG FOR DIRNAME IN TYPE MODULE----------//
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------SESSION MUST NEED----------//
import exphbs from 'express-handlebars';
import Session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';

//----------CLASSES----------//
import  configMySql from './src/config/configMySql.js';//<---MySQL Config
import SQL from './src/handlers/productClass.js' //<---Product class using MySQL
import MongoClass from './src/handlers/messageMongoClass.js';//<---Message class using Mongoose

import fakerRouter from './src/router/fakerRouter.js'//<---Router random products with Faker

import { normalize,schema } from "normalizr";//<---Normalizer,used on socket



//----------SCHEMAS----------//

const esquema = mongoose.Schema;
const messageSchema = new esquema({
    author:{
        id:  String,
        name: String,
        lastname: String,
        age: Number,
        alias: String,
        avatar: String,
    },
    text: String
})
const userSchema = new esquema({
  username: String,
  password: String,
  email: String,
})

//----------CLASSES----------//

const messages = new MongoClass('messages', messageSchema)
const users = new MongoClass('users', userSchema)

const products = new SQL(configMySql,'products')

/* --------------------- SERVER --------------------------- */

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//-----------------------WEBSOCKET-----------------------//

io.on('connection', async(socket)=>{
  console.log('funciona')
  socket.on('logIn', user=>{
      console.log(user)
      socket.emit('logged', user)
  })

  //-------------PRODUCTS-----------------//  
  const productListed = await products.getAll();
 
  socket.emit('showProducts', productListed)

  socket.on('newProduct', product =>{
      products.add(product)
      socket.emit('showProducts', productListed)
  })

  //-------------MESSAGES-----------------//
  const messagesListed = await messages.getAll();

  const authorSchema = new schema.Entity('authors')

  const messageSchema = new schema.Entity('messages', {
      author: authorSchema,
  }, {idAttribute:'_id'})

  const normalizedMessages = normalize(messagesListed, [messageSchema])

  socket.emit('showMessages', normalizedMessages)
  socket.on('newMessage', message =>{
      messages.add(message)
      socket.emit('showMessages',messagesListed)
  })
})
/* --------------------- MIDDLEWARE --------------------------- */

app.use(Session({
  secret:'a',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: '/public/views/main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


/* ------------------ PASSPORT -------------------- */

passport.use('register', new Strategy(
  {
  passReqToCallback: true
  },
  async (req, username, password, done) => {

  const { email } = req.body

  const usersListed = await users.getAll();

  const userFound = usersListed.find(user => user.username == username)
  if (userFound) {
    return done('already registered')
  }
  const newUser = {
    username,
    password,
    email,
  }
  users.add(newUser)

  return done(null, newUser)
}));

passport.use('login', new Strategy(async (username, password, done) => {
  const usersListed = await users.getAll();


  const userFound = usersListed.find(user => user.username == username)

  if (!userFound) {
    return done(null, false)
  }

  if (userFound.password != password) {
    return done(null, false)
  }

  userFound.contador = 0

  return done(null, userFound);
}));

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  const usersListed = await users.getAll();

  const usuario = usersListed.find(usuario => usuario.username == username)
  done(null, usuario);
});

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* --------------------- ROUTES --------------------------- */
app.use('/api/products', fakerRouter)

/* --------- HOME ---------- */
app.get('/', isAuth, (req, res) => {
  res.redirect('/plataforma')
})

/* --------- REGISTER ---------- */
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/views/register.html')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

app.get('/failregister', (req, res) => {
  res.render('register-error');
})

/* --------- LOGIN ---------- */
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/views/login.html')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/plataforma' }))

app.get('/faillogin', (req, res) => {
  res.render('login-error');
})


app.get('/plataforma', isAuth, (req, res) => {
  if (!req.user.contador) {
    req.user.contador = 0
  }
  req.user.contador++
  res.sendFile(__dirname + '/public/views/data.html')
})

/* --------- LOGOUT ---------- */
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (!err){
      console.log('Logged out')
      req.logout();
      res.redirect('/')
    } 
    else res.send({ status: 'Logout ERROR', body: err })
  })
})

/* --------- SERVER BASICS ---------- */
const PORT = 8080
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))
