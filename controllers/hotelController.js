const Hotel = require('./../models/Hotel.model')
const City = require('./../models/City.model')
const mongoose = require("mongoose")
const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')
const unirest = require("unirest");
// const { findById } = require('./../models/City.model');
// exports.hotelList = async (req, res) => {
//     Hotel.find({})
//     .then((hotelsFound)=> {
//         res.render('hotels/hotels', {hotelsFound})
//     })
//     .catch((e) => console.log(e))
// }
exports.hotelList = async (req, res) => {
    
            const dest = req.params.bookingId
            const reqUni = unirest("GET", `https://booking-com.p.rapidapi.com/v1/hotels/search`);
            reqUni.query({
                "units": "metric",
                "order_by": "popularity",
                "checkin_date": "2021-11-25",
                "filter_by_currency": "USD",
                "adults_number": "2",
                "checkout_date": "2021-11-26",
                "dest_id": dest,
                "locale": "en-gb",
                "dest_type": "city",
                "room_number": "1",
            });
            reqUni.headers({
                "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
                "x-rapidapi-host": "booking-com.p.rapidapi.com",
                "useQueryString": true
            });
            // EJECUTAR LA BÚSQUEDA API
            reqUni.end(function (response) {
                if (response.error) throw new Error(response.error);
                hotels = response.body.result;
                res.render("partials/hotels", {
                    hotels: hotels
                })
                return hotels
            })
}
// console.log(hotels)
// res.render('hotels/hotels')