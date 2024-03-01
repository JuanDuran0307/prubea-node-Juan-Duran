const { fa } = require("@faker-js/faker");
const { Model, DataTypes} = require("sequelize");
const sequelize = require ("../db/db");
const tiendas_productos = require("./tienda.product.model");
const promociones = require("./promociones.model");

class productos extends Model {}

productos.init({
    id: {
        type: DataTypes.INTEGER,
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
      kit: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '0=No 1=Si... Para evaluar disponibilidad, descuentos y otros en productos_kits',
      },
      barcode: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Código de barras',
      },
      nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      presentacion: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        defaultValue: null,
      },
      foto: {
        type: DataTypes.STRING(120),
        defaultValue: null,
        comment: 'Max 200',
      },
      peso: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: 0.00,
        comment: 'En Kilogramos',
      },    
    }, {
    sequelize,
    modelName: 'productos',
    tableName: 'productos',
    timestamps: false,
    indexes: [
        {
          unique: true,
          fields: ['barcode'],
        },
        {
          unique: true,
          fields: ['nombre', 'presentacion'],
        },
        {
          fields: ['barcode'],
        },
      ],
    });



module.exports = productos;




