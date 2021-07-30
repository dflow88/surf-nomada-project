const express       = require('express');
const router        = express.Router()

const cityController = require('./../controllers/cityController')

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

router.get('/', cityController.cityList)

router.get('/create', cityController.getCreateCity)

router.post('/create', cityController.createCity)

router.get('/', cityController.viewCityHotels)

module.exports = router