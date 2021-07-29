const City = require('./../models/City.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')


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

exports.createCity = async (req, res) => {
    const { cityName, country, description } = req.body
    City.create({ cityName, country, description })
        .then((cityCreated) => {
            res.render("cities/cities")
        })
        .catch((e) => console.log(e))
}