const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter")
//combinar información sobre videojuegos desde dos fuentes diferentes: la base de datos local y una API 
const getAllVG = async ()=>{

    
    const vgDB = await Videogame.findAll({ //consulta a la base de datos para obtener todos los videojuegos
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    });
    
    
    
    let arrayWithPromises = [] //ontendrá las promesas resultantes de realizar solicitudes a la API de Rawg para
                                    //  obtener videojuegos de diferentes páginas.
    for(let i =1; i<6; i++){
      arrayWithPromises = [...arrayWithPromises, axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)]
    }
    
    
    
    const resolved = await Promise.all(arrayWithPromises)
    
    
    const api = resolved.map((x)=>x.data.results)
    
    
    let arrayWithObjects = [] //bucle para construir un array llamado arrayWithObjects que contiene todos los objetos obtenidos de las respuestas de la API.
   
    api.forEach(x=>x.forEach(z=>{
        arrayWithObjects.push(z)
    }))
    
   
    const apiResponse = apiFilter(arrayWithObjects)
   
     
    return [...vgDB,...apiResponse] //Se combinan los datos de la base de datos (vgDB) y los datos filtrados de la API (apiResponse). La función retorna este resultado combinado.

};

module.exports ={getAllVG}