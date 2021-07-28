const bcryptjs = require("bcryptjs")
const { compareSync } = require('bcryptjs')
const User = require('./../models/User.model')
const mongoose = require("mongoose")

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')


exports.signup = async (req, res) => {

    res.render('users/signup')
}

exports.createUser = async (req, res) => {

        try {
            const { username, email, password } = await req.body
            if(!username || !email || !password) {
                let missingField = await res.render('users/signup', {msg: "Please complete all fields."})
                return missingField
            }
            const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
            if(!regex.test(password)){
                let regexErr = await res.status(500).render("users/signup", {msg: "Password must contain at least 6 characters, 1 lower case, 1 upper case, and 1 number."})
                return regexErr
            }
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            const createdUser = await User.create({ username, email, password: hashedPassword //, stance: undefined, country: undefined, pictureUrl: undefined
            })
            req.session.currentUser = createdUser
                console.log(createdUser)
                res.redirect('/users/profile')
        } catch(e) {
            if(e instanceof mongoose.Error.ValidationError){
                res.status(500).render("users/signup", {msg: "Use a valid email."})
            } else if (e.code === 11000) {
                res.status(500).render("users/signup", {msg: "This username or email already exists. Please try another one."})
            }
        } 
}


exports.userProfile = async (req, res) => {
    res.render('users/user-profile', { currentUser: req.session.currentUser })
}

exports.loginPage = async (req, res) => {
    res.render("users/login")
}

exports.login = async (req, res) => {

    try {
        const { username, password } = await req.body
        if (!username || !password) {
            let missingField = await res.render("users/login", {msg: "Please enter both username and password."})
            return missingField
        }
        const getUser = await User.findOne({username})
        if (!getUser){
            let notFound = await res.render("users/login", {msg: "Username does not exist."})
            return notFound
        }
        const verify = await bcryptjs.compareSync(password, getUser.password)
        if(!verify) {
            let wrongPass = await res.render("users/login", {msg: "Password is incorrect."})
            return wrongPass
        }
        req.session.currentUser = await getUser
        res.redirect("/users/profile")
    } catch(e) {
        console.log(e)
    } 

}

exports.profileEditPage = async (req, res) => {
    res.render("users/user-profile-edit", { currentUser: req.session.currentUser })
}

exports.profileEdit = async (req, res) => {
    try {
        const { name, lastName, stance, country, pictureUrl } = await req.body
        const userId = await req.session.currentUser._id
        await User.findByIdAndUpdate(userId, { name: name, lastName: lastName, stance: stance, country: country, pictureUrl: pictureUrl })
        const updatedUser = await User.findById(userId)
            currentUser = updatedUser
            req.session.currentUser = updatedUser
            res.render("users/user-profile-edit", {currentUser, msg: "Profile updated"})
    } catch (e) {
        console.log(e)
    }
}