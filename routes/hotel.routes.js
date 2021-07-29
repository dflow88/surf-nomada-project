const express       = require('express');
const router        = express.Router()

const hotelController = require('./../controllers/hotelController')

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

router.get('/', hotelController.hotelList)

// router.get('/create', hotelController.getCreateHotel)

// router.post('/create', hotelController.createHotel)


module.exports = router