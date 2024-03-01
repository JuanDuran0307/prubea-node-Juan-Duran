const {Model, DataTypes} = require("sequelize");
const sequelize = require("../db/db");
const productos = require("./product.model");
const tiendas = require("./tiendas.model");
const users = require("./users.model")


class carritos extends Model{}

carritos.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cantidad: {
        type: DataTypes.DECIMAL(9, 3),
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: productos,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_tienda: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: tiendas,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_user: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        comment: 'Cliente Comprador',
        references: {
          model: users,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: "carritos",
      tableName: "carritos",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["id_producto", "id_tienda", "id_user"],
          name: "id_producto_2",
        },
        {
          fields: ["id_user"],
          name: "created_by",
        },
        {
          fields: ["id_producto"],
          name: "id_producto",
        },
        {
          fields: ["id_tienda"],
          name: "id_tienda",
        },
      ],
  });


  
  module.exports = carritos;