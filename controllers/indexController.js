
const City = require('./../models/City.model')

//CONTROLADORES
exports.startHome = async (req, res) => {
    City.find({})
    .then((citiesFound)=> {

        res.render("index", {citiesFound})
    })
    .catch((e) => console.log(e))
}


// ES LO MISMO QUE PONER CONST INICIAR HOME Y LUEGO MODULE.EXPORTS