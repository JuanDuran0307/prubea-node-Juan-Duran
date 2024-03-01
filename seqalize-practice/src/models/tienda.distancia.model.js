const {Model, DataTypes} = require("sequelize");
const sequelize = require("../db/db");
const tiendas = require("./tiendas.model");

class tiendas_distancias extends Model{};

tiendas_distancias.init({
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: tiendas,
            key: 'id'
        }
    },
    valor: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    desde: {
        type: DataTypes.SMALLINT,
        defaultValue: null
    },
    hasta: {
        type: DataTypes.SMALLINT,
        defaultValue: null,
    }
}, {
    sequelize, 
    modelName: 'Tiendas_distancia', 
    tableName: 'tiendas_distancias', 
    timestamps: false 
});

module.exports = tiendas_distancias;