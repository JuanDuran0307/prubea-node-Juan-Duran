const {Sequelize} = require("sequelize");


const sequelize = new Sequelize('market', 'root', '', {
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    dialect:  "mysql"
  });


module.exports = sequelize;