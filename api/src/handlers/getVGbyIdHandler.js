const {getVGbyId} = require("../controllers/getVGbyId");
//maneja las solicitudes para obtener información de un videojuego por su ID

const getVGbyIdHandler =async(req, res)=>{
  const id = req.params.id;
  const source = isNaN(id)? "DB" : "API"; //determinar si el ID es un número
  try {                               //n
    const vgId = await getVGbyId(id, source)
    res.status(200).json(vgId)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
};

module.exports = {getVGbyIdHandler} 