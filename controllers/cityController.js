const City = require('./../models/City.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

var unirest = require("unirest");




exports.cityList = async (req, res) => {
    City.find({})
    .then((citiesFound)=> {
        res.render('cities/cities', {citiesFound})
    })
    .catch((e) => console.log(e))

}

exports.getCreateCity = async (req, res) => {
    res.render('cities/create-city')
}

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
    const hotels = res.body.result;
    return hotels
})
// console.log(hotels)

exports.createCity = (req, res) => {
    const { cityName, country, description } = req.body
    City.create({ cityName, country, description })
        .then((cityCreated) => {
            // City.findByIdAndUpdate(cityCreated._id, {hotels: hotels})
        })
        .then(() => {
            res.redirect("/cities")
        })
        .catch((e) => console.log(e))

}