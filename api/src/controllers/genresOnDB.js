const axios = require("axios");
const {API_KEY} = process.env
const {Videogame, Genre} = require("../db")



const get_genres = async()=>{

    const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

  
    const genres = await response.map(el => el.name)

    return genres
};



const genresOnDB = async ()=>{
    try {
       
        const genres =await Genre.findAll(); //consulta a la base de datos para obtener todos los géneros existentes
       
        if(genres.length === 0){
            
            const allGenres = await get_genres();

            
           for(let i=0; i<allGenres.length; i++){
            await Genre.create({name: allGenres[i]})
           }  //para obtener todos los géneros desde la API y luego se crean registros en la base de datos para cada género.
             
        }
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = {genresOnDB}

//get_genres, realiza una solicitud a la API para obtener nombres de géneros.
// genresOnDB, consulta los géneros en la base de datos, y si no hay ninguno, obtiene los géneros desde la API y los crea en la base de datos.





