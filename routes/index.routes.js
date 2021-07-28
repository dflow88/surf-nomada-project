//IMPORTACIONES
const express       = require('express')
const router        = express.Router()

const indexController = require('../controllers/indexController.js')

//RUTEO

router.get('/', indexController.startHome)


//EXPORTACIONES

module.exports = router