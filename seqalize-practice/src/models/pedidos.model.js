const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const tiendas = require('./tiendas.model');
const users = require('./users.model');

class pedidos extends Model {}

pedidos.init({
  id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  instrucciones: {
    type: DataTypes.STRING(500),
    defaultValue: null,
  },
  entrega_fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'El cliente cuando desea que su pedido sea entregado',
  },
  valor_productos: {
    type: DataTypes.DECIMAL(12, 3).UNSIGNED,
    allowNull: false,
  },
  valor_envio: {
    type: DataTypes.DECIMAL(10, 3).UNSIGNED,
    allowNull: false,
  },
  valor_descuento: {
    type: DataTypes.DECIMAL(12, 3).UNSIGNED,
    allowNull: false,
    comment: 'Valor producto - Valor promo',
  },
  valor_cupon: {
    type: DataTypes.DECIMAL(11, 3).UNSIGNED,
    allowNull: false,
    defaultValue: 0.000,
    comment: 'Valor descuento por cupón aplicado (tomado del pedido hijo)',
  },
  impuestos: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '0=No 1=Si',
  },
  valor_impuestos: {
    type: DataTypes.DECIMAL(11, 3).UNSIGNED,
    allowNull: false,
    defaultValue: 0.000,
    comment: 'Valor de impuestos de todos los productos -- No tiene en cuenta el valor final',
  },
  valor_final: {
    type: DataTypes.DECIMAL(12, 3).UNSIGNED,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: null,
    comment: 'Calculado con todas las Calificaciones y sus pesos',
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
  direccion: {
    type: DataTypes.STRING(160),
    defaultValue: null,
    comment: 'Guardar el String de la dirección del cliente en ese momento. En manual es digitada',
  },
  valor_comision: {
    type: DataTypes.DECIMAL(11, 3).UNSIGNED,
    allowNull: false,
    defaultValue: 0.000,
    comment: 'Es el valor de la comisión calculado segun la utilidad',
  },
  id_user: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    defaultValue: null,
    references: {
      model: users,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'pedidos',
  tableName: 'pedidos',
  indexes: [
    {
      name: 'created_by',
      fields: ['id_user'],
    },
    {
      name: 'id_tienda',
      fields: ['id_tienda'],
    },
  ],
  comment: 'Son los pedidos hechos por el Cliente, con la información Resumen y directa',
});

module.exports = pedidos;
