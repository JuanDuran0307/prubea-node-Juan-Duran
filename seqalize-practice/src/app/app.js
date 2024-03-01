const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const ProductRouter = require("../router/products.router");
const TiendasRouter = require("../router/tienda.router");
const CarritoRouter = require("../router/carritos.router");
const PedidosRouter = require("../router/pedidos.router");

const createTiendaPromoRouter = require("../router/tienda.promociones");
const routerPromo = createTiendaPromoRouter();



dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    res.send("this is express")
})
app.use("/market",ProductRouter,TiendasRouter,CarritoRouter,PedidosRouter),//PedidosRouter);

app.use('/market',routerPromo)
module.exports = app;