const express       = require('express');
const router        = express.Router()

const cityController = require('./../controllers/cityController')

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

router.get('/', cityController.cityList)

router.get('/create', cityController.createCity)

// router.post('/cities', cityController.XXXXXXX)




module.exports = router