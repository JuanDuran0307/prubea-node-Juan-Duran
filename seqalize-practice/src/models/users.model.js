const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

class users extends Model {}

users.init(
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: '0=Inactivo 1=Activo',
    },
    tipo: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1=Admin 2=Tienda 3=Cliente',
    },
    login: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment: '1=Teléfono 2=Correo',
    },
    telefono: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: null,
      unique: true,
      comment: 'Identificador Principal. Unique',
    },
    codigo_temporal: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      defaultValue: null,
      comment: 'Código temporal para Login por mensaje de texto o correo',
    },
    correo: {
      type: DataTypes.STRING(70),
      defaultValue: null,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(120),
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["telefono"],
        name: "telefono",
      },
      {
        unique: true,
        fields: ["correo"],
        name: "correo",
      },
    ],
  }
);

module.exports = users;
