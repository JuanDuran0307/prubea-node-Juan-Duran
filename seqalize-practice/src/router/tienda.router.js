const TiendasRouter = require("express").Router();
const tienda = require("../models/tiendas.model");




TiendasRouter.get("/seeStores",async(req,res)=>{
    try {
        const tiendas = await tienda.findAll();
        console.log(tiendas.every(user => user instanceof tienda)); // true
        console.log("All tiendas:", JSON.stringify(tiendas, null, 2));
    } catch (error) {
        console.error("error",error)
    }
  
})

TiendasRouter.get("/seeStore/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const TIenda = await tienda.findOne({where: {id:id}});
        console.log("TIenda:");
        res.status(201).json({
            ok: true,
            status: 201,
            TIenda
        })
    } catch (error) {
        console.error("error",error)
    }
})



module.exports = TiendasRouter;