const {Op} = require("sequelize")
const axios = require("axios")
const {Videogame, Genre} = require("../db");
const { apiFilter } = require("./apiFilter");
const {API_KEY} = process.env
//buscar información sobre videojuegos por nombre

const getVGbyName = async(name)=>{
  
   const responseDB = await Videogame.findAll({
     where:{
        name: {
            [Op.iLike]: `%${name}%`, //busca name
        }
     },
     include:[{
        model: Genre,
        attributes: ["name"],
        through: {attributes:[]}
     }]
   })
  
   
   let response = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results
   const responseApi = await apiFilter(response)
   
   
   return [...responseDB, ...responseApi]
}

module.exports = {getVGbyName}