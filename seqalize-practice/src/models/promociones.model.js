const {Model, DataTypes} = require("sequelize");
const sequelize = require("../db/db");
const productos = require("./product.model");
const tiendas_promociones = require("./tienda.promociones.model");
const tiendas_productos = require("./tienda.product.model");

class promociones extends Model{};

promociones.init({
    id: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '0=Inactivo 1=Activo',
      },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(120),
        defaultValue: null,
        comment: 'Max 900',
    },
    porcentaje: {
        type: DataTypes.TINYINT,
        defaultValue: null,
    },
    dias_semana: {
        type: DataTypes.STRING(21),
        allowNull: false,
        defaultValue: '[0,0,0,0,0,0,0]',
        comment: '0=No 1=Si... Lunes=Día_1 Domingo=Día_7... Aplica para Full_categoría',
    },
    }, {
    sequelize,
    modelName: 'promociones',
    tableName: 'promociones',
    timestamps: false,
});


  


module.exports = promociones;