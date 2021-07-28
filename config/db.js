// IMPORTACIONES

const mongoose     = require("mongoose")
require("dotenv").config()


// MIDDLEWARE
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })

        console.log("Base de datos conectada")

    } catch(e) {
        console.log(e)
    }
}

// EXPORTACION

module.exports = connectDB