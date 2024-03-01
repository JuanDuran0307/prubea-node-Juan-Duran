const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class pedidos_estados extends Model{};

pedidos_estados.init({
    id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    id_pedido: {
        type: DataTypes.MEDIUMINT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'PedidoEstado', // Nombre del modelo en singular
    tableName: 'pedidos_estados', // Nombre de la tabla en plural
    timestamps: false // Desactivar la c
});


module.exports = pedidos_estados;