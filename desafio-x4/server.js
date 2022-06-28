import express from 'express'
import { Server as HttpServer } from 'http' //<---Server http
import { Server as IOServer }  from "socket.io"; //<---Socket
//----------CONFIG FOR DIRNAME IN TYPE MODULE----------//
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------SESSION MUST NEED----------//
import exphbs from 'express-handlebars';
import Session from 'express-session';
import passport from 'passport';
import { users } from './src/class/usersClass.js';


import { registerStrategy } from './src/session/register.js';
import { loginStrategy } from './src/session/login.js';

//----------ROUTERS----------//
import fakerRouter from './src/router/fakerRouter.js'//<---Router random products with Faker
import infoRouter from './src/router/infoRouter.js'
import randomRouter from './src/router/randomRouter.js'


//-----------------------SOCKETS-----------------------//
import { productSocket } from './src/sockets/productSocket.js';
import { messageSocket } from './src/sockets/messageSocket.js';

/* --------------------- SERVER --------------------------- */

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//-----------------------WEBSOCKET-----------------------//

io.on('connection', (socket)=>{

  //-------------PRODUCTS-----------------//  
  productSocket(socket)

  //-------------MESSAGES-----------------//
  messageSocket(socket)
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

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

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
app.use('/info', infoRouter)
app.use('/api/randoms', randomRouter)
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
