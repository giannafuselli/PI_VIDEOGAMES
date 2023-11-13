const {Genre}= require("../db");


const getGenres = async(req, res)=>{
    try {
        const response = await Genre.findAll();
        res.status(200).json(response)
    } catch (error) {
       res.status(400).send({error: error.message})
    }
};

module.exports={getGenres}
//Obtener Géneros desde la Base de Datos