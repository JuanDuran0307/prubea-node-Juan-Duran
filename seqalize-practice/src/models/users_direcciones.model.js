const {Model, DataTypes} = require("sequelize");
const sequelize = require("../db/db");
const users = require("./users.model");

class user_direcciones extends Model{}

user_direcciones.init({
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    distancia: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: users,
            key: 'id'
        }
    }
}, {
    sequelize, 
    modelName: 'users_direcciones', 
    tableName: 'users_direcciones', 
    timestamps: false 
});



module.exports = user_direcciones;