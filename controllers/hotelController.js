const Hotel = require('./../models/Hotel.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

var unirest = require("unirest");




// exports.hotelList = async (req, res) => {
//     Hotel.find({})
//     .then((hotelsFound)=> {
//         res.render('hotels/hotels', {hotelsFound})
//     })
//     .catch((e) => console.log(e))
// }

exports.hotelList = async (req, res) => {

    let hotels

var req = unirest("GET", "https://booking-com.p.rapidapi.com/v1/hotels/search");

req.query({
    "units": "metric",
    "order_by": "popularity",
    "checkin_date": "2021-11-25",
    "filter_by_currency": "USD",
    "adults_number": "2",
    "checkout_date": "2021-11-26",
    "dest_id": "-1690388",
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
    hotels = res.body.result[0];
    console.log(hotels)
    return hotels
})
}

console.log(hotels)
res.render('hotels/hotels')
}