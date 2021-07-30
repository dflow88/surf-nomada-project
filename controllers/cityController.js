const City = require('./../models/City.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

var unirest = require("unirest");




exports.cityList = async (req, res) => {
    City.find({})
    .then((citiesFound)=> {
        res.render('partials/cities', {citiesFound})
    })
    .catch((e) => console.log(e))
}

exports.viewCityHotels = (req, res) => {
    res.render('partials/hotels', )
}



exports.getCreateCity = async (req, res) => {
    res.render('cities/create-city')
}

// var req = unirest("GET", "https://booking-com.p.rapidapi.com/v1/hotels/search");

// req.query({
//     "units": "metric",
//     "order_by": "popularity",
//     "checkin_date": "2021-11-25",
//     "filter_by_currency": "USD",
//     "adults_number": "2",
//     "checkout_date": "2021-11-26",
//     "dest_id": "257439",
//     "locale": "en-gb",
//     "dest_type": "landmark",
//     "room_number": "1",
// });

// req.headers({
//     "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
//     "x-rapidapi-host": "booking-com.p.rapidapi.com",
//     "useQueryString": true
// });
// req.end(function (res) {
//     if (res.error) throw new Error(res.error);
//     const hotels = res.body.result;
//     return hotels
// })

exports.createCity = (req, res) => {
    const { cityName, destBookingId, country, description, imageUrl } = req.body
    City.create({ cityName, destBookingId, country, description, imageUrl })
        .then((cityCreated) => {

            // City.findByIdAndUpdate(cityCreated._id, {hotels: hotels})
        })
        .then(() => {
            res.redirect("/cities")
        })
        .catch((e) => console.log(e))

}

