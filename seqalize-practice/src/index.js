const app = require ("./app/app.js");
const sequelize = require("./db/db.js");
const port = process.env.PORT || 3001;

app.listen(port, async ()=>{
    try{
        console.log("server running on port:", port)
        await sequelize.authenticate();
        console.log("conexion exitosa a la base de datos");
    }catch(err){
        console.error("Error",error)
    }

})