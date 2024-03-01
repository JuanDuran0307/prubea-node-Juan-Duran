    const {Model,DataTypes} = require("sequelize");
    const sequelize = require("../db/db");
const tiendas_productos = require("./tienda.product.model");


    class tiendas extends Model{};

    tiendas.init({
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        estado: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '0=Inactivo 1=Activo',
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(500),
            defaultValue: null,
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        direccion_anexo: {
            type: DataTypes.STRING(40),
            defaultValue: null,
        },
        direccion_barrio: {
            type: DataTypes.STRING(25),
            defaultValue: null,
        },
        calificacion: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        calificacion_cantidad: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            defaultValue: 0,
        },
        impuestos: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '0=No 1=Si +Impto 2=Si Impto incluido 3=Si Impto incluido sin etiqueta',
        },
        dias_trabajados: {
            type: DataTypes.STRING(21),
            allowNull: false,
            defaultValue: '[1,1,1,1,1,1,0]',
            comment: 'Arreglo de los días en trabaja el Cedis... 0=No trabaja 1=Si trabaja... Lunes=Día_1 Domingo=Día_7',
        },
        }, {
        sequelize,
        modelName: 'tiendas',
        tableName: 'tiendas',
        timestamps: false,
    })

        
   
    module.exports = tiendas;