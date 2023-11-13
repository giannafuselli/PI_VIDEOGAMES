const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
     type: DataTypes.UUID,
     primaryKey: true,
     allowNull: false,
     defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://www.latercera.com/resizer/DQq-BF-ulL7eY2IK1V9CdfW4SJI=/arc-anglerfish-arc2-prod-copesa/public/JRVRFF65PNAJ5PU4JCRHYFJRP4.jpeg"
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    released:{
      type: DataTypes.STRING,
      allowNull:false
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  }, {timestamps: false});
};