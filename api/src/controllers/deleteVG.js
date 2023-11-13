const {Videogame, Genre} = require ("../db.js")


const deleteVG = async (req, res)=>{ //solicitud y la respuesta HTTP
  try { //puede generar errores
    
    const {id} = req.params

    const response = await Videogame.destroy({where : {id: id}}) //ara eliminar el videojuego cuyo ID coincide con el valor extraído de la solicitud
   
    const allVideoGames = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    })
    res.status(200).json(allVideoGames)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};

module.exports = {deleteVG} //deleteVG elimina un videojuego de la base de datos según el ID proporcionado en la solicitud y luego devuelve la lista actualizada 