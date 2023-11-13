const apiFilter =  (array) =>{

    const clear = array.map((el) => {    //Se utiliza el método map para iterar sobre cada elemento (el) del array de entrada y realizar transformaciones en cada uno.
        if(!el.name){return}         //Se verifica si el elemento actual no tiene una propiedad name. Si es así, se devuelve undefined, lo que efectivamente elimina ese elemento del nuevo array resultante (clear).

        const platformsArray = el.platforms
        const platArray = platformsArray ? platformsArray.map(x=>x.platform.name) : []

        const apiGenres = el.genres ? el.genres.map(x=>{     
            return {name: x.name} //Se extraen los géneros del elemento actual. Si hay géneros, se crea un nuevo array de objetos que contienen el nombre de cada género. Si no hay géneros, se crea un objeto con el nombre "no genres".
        }) : [{name:"no genres"}]

        const imagen = "https://www.latercera.com/resizer/DQq-BF-ulL7eY2IK1V9CdfW4SJI=/arc-anglerfish-arc2-prod-copesa/public/JRVRFF65PNAJ5PU4JCRHYFJRP4.jpeg"


        return {
            id: el.id ? el.id : "undefined ID",
            name: el.name ? el.name : "undefined NAME",
            image: el.background_image ? el.background_image : imagen,
            description: el.description ? el.description : "undefined DESCRIPTION",
            released: el.released ? el.released : "undefined RELEASED",
            rating: el.rating ? el.rating : "undefined RATING",
            platforms: platArray,
            genres: apiGenres
        }
    })
    return clear
}

module.exports = {apiFilter} //apiFilter toma un array de objetos, filtra aquellos que no tienen una propiedad name, y luego realiza transformaciones en cada objeto restante, construyendo un nuevo array con propiedades específicas 