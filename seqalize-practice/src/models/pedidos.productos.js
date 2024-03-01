const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class pedidos_productos extends Model{};

pedidos_productos.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.DECIMAL(9, 3),
        allowNull: false
    },
    valor_unitario: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false
    },
    valor_unitario_promocion: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false
    },
    total_teorico: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    total_final: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    id_promocion: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
        references: {
            model: Promocion,
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    id_pedido: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id'
        }
    }
}, {
    sequelize, // Pasar la instancia de Sequelize
    modelName: 'PedidoProducto', // Nombre del modelo en singular
    tableName: 'pedidos_productos', // Nombre de la tabla en plural
    timestamps: false // Desactivar la creación automática de timestamps
});


module.exports = pedidos_productos;