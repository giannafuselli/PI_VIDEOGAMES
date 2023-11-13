const { DataTypes } = require("sequelize");//define un modelo de Sequelize para la genre

module.exports = (sequelize) => {
  sequelize.define(
    'genre',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
    },
    { timestamps: false }
  );
};