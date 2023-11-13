const { getAllVG } = require("../controllers/getVG");
const {getVGbyName} = require("../controllers/getVGbyName");
//obtener información específica de un videojuego por nombre

const getVGhandler = async(req, res)=>{
  try {
    const name = req.query.name
    const response = name? await getVGbyName(name) : await getAllVG();

    res.status(200).json(response)

  } catch (error) {
    res.status(404).send({error: error.message})
  }
};

module.exports= {getVGhandler}
