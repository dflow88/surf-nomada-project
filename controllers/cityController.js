const City = require('./../models/City.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')


exports.cityList = async (req, res) => {

    res.render('cities/cities')
}

exports.createCity = async (req, res) => {

    res.render('cities/create-city')
}