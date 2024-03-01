const {Model,DataTypes} = require("sequelize");
const sequelize = require("../db/db");
const tiendas = require("./tiendas.model");
const promociones = require("./promociones.model");


class tiendas_promociones extends Model{};

tiendas_promociones.init({
    id: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        primaryKey: true,
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '0=Inactivo 1=Activo',
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_tienda: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: tiendas,
          key: 'id'
        
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    id_promocion: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        references: {
          model: promociones,
          key: 'id'
        
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    }, {
    sequelize,
    modelName: 'tiendas_promociones',
    tableName: 'tiendas_promociones',
    timestamps: false,
})




module.exports = tiendas_promociones;