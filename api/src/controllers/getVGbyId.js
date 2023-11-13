const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter");
//obtener de detalles de un videojuego específico


const getVGbyId = async(id, source)=>{
    if(source === "API"){ //obtener información sobre un videojuego específico por su ID.
         const response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
         const vgApi = await apiFilter([response]) // filtrar y transformar la respuesta de la API.

         return vgApi[0]
    }else{
    const vgDB = await Videogame.findOne({
        where: {id:id}, //Si la fuente no es la APIse utiliza el modelo videogame para realizar una consulta y obtener un videojuego específico por su ID desde la base de datos local.
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
         }]
       })
       return vgDB //videojuego obtenido de la base de datos local.
    }
};

module.exports = {getVGbyId}