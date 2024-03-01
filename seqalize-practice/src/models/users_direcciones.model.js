const {Model, DataTypes} = require("sequelize");
const sequelize = require("../db/db");

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
            model: User,
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