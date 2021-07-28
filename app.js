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

var unirest = require("unirest");

var req = unirest("GET", "https://booking-com.p.rapidapi.com/v1/hotels/search");

req.query({
	"units": "metric",
	"order_by": "popularity",
	"checkin_date": "2021-11-25",
	"filter_by_currency": "USD",
	"adults_number": "2",
	"checkout_date": "2021-11-26",
	"dest_id": "-553173",
	"locale": "en-gb",
	"dest_type": "city",
	"room_number": "1",
});

req.headers({
	"x-rapidapi-key": "3aa36b1cebmsh02fd7f4af4d8813p1d8fc7jsn2b9681bfd475",
	"x-rapidapi-host": "booking-com.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.result[0].hotel_name);
});

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