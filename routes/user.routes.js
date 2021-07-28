const express       = require('express');
const router        = express.Router()

const userController = require('./../controllers/userController')

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

router.get('/signup', userController.signup)

router.post('/signup', userController.createUser)

router.get('/profile', isLoggedIn, userController.userProfile)

router.get('/login', userController.loginPage)

router.post('/login', userController.login)

router.get('/profile/edit', isLoggedIn, userController.profileEditPage)

router.post('/profile/edit', userController.profileEdit)

module.exports = router