const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const promociones = require("./promociones.model");
const tiendas = require("./tiendas.model");
const productos = require("./product.model");

class tiendas_productos extends Model {}

tiendas_productos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    compra_maxima: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      defaultValue: 1.0,
    },
    valor: {  
      type: DataTypes.DECIMAL(11, 3),
      allowNull: false,
      comment: 'Valor de venta más actual',
    },
    id_promocion: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      references: {
        model: promociones,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    id_tienda: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: tiendas,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: productos,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'tiendas_productos',
    tableName: 'tiendas_productos',
    timestamps:false
  }
);


module.exports = tiendas_productos;
