// IMPORTACIONES

const express       = require('express')
const app           = express()
const cookieParser  = require('cookie-parser')
const hbs           = require("hbs");
const mongoose      = require('mongoose');
const path          = require("path");
const bodyParser    = require('body-parser')

const connectDB     = require('./config/db')



//VARIABLES DE ENTORNO

require('dotenv').config()

//  MIDDLEWARES
//base de datos
connectDB()


// SESSIONS N COOKIES
require("./config/session.config")(app)

// API IMPORT






//HBS
app.set("view engine", 'hbs')
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// LAYOUT MIDDLEWARE

app.use((req,res,next) => {
    res.locals.currentUser = req.session.currentUser
    next()
  })



// RUTAS
app.use('/', require('./routes/index.routes'))

app.use('/users', require('./routes/user.routes'))

app.use('/cities', require('./routes/city.routes'))


app.use(cookieParser());

// SERVIDOR

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
})