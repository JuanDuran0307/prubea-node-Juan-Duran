const { Model,DataTypes } = require("sequelize")
const sequelize= require("../db/db");
const users = require("./users.model");
const users_direcciones = require("./users_direcciones.model")




class user_clientes extends Model {}


user_clientes.init (
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      nombre: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      genero: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      identificacion: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      id_direccion: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
        references: {
            model: users_direcciones,
            key: 'id'
        }
      },
      id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: users,
            key: 'id'
        }
      }
},{
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'users_clientes', // Nombre del modelo en singular
    tableName: 'users_clientes', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});

module.exports = user_clientes;