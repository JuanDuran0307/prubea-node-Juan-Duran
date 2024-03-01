const ProductRouter = require("express").Router();
const productos = require ("../models/product.model");
const tiendas_productos = require("../models/tienda.product.model")
const promociones = require("../models/promociones.model");
const tiendas_promociones = require("../models/tienda.promociones.model");
const tiendas = require("../models/tiendas.model");


ProductRouter.get("/productos",async(req, res)=>{
    await productos.sync()
    res.send("product route")
})
ProductRouter.get("/OneProduct",async(req, res)=>{
    res.send("productOne route")
})
ProductRouter.post("/CreateProduct",async(req,res)=>{
    try {
        await productos.sync();
        const {estado,kit,barcode,nombre,presentacion,descripcion,foto,peso} = req.body;
        const createProduct = await productos.create({
            estado,kit,barcode,nombre,presentacion,descripcion,foto,peso

        })
        console.log(req.body);
        res.status(201).json({
            ok: true,
            status: 201,
            message: "PRODUCT CREATED",
            data: createProduct
        })
        
        } catch (error) {
            console.error("error",error)
            res.status(500).json({ error: 'Internal Server Error' });
        }r
})

ProductRouter.post("/asociarProducto", async (req, res) => {
    try {

        const { id_tienda, id_producto } = req.body;

        // Verificar si ya existe una relación con esos valores
        const existingRelation = await tiendas_productos.findOne({
            where: { id_tienda, id_producto },
        });

        if (existingRelation) {
            return res.status(409).json({
                ok: false,
                status: 409,
                message: "Ya existe una relación con esos valores en la tienda",
            });
        }

        // Obtener la tienda por su ID
        const tienda = await tiendas.findByPk(id_tienda);

        if (!tienda) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la tienda con el ID especificado",
            });
        }

        // Si no existe, crear la nueva relación
        const { compra_maxima, valor, id_promocion } = req.body;
        const asociateProduct = await tiendas_productos.create({
            compra_maxima, valor, id_promocion, id_tienda, id_producto
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto agregado a la tienda",
            id_tienda,
            tienda_nombre: tienda.nombre, // Aquí se agrega el nombre de la tienda
            data: asociateProduct
        });
    } catch (error) {
        console.error("error", error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});













ProductRouter.put("/PutProduct",async(req,res)=>{
    res.send("Actualizar Producto")
})

ProductRouter.delete("DelProduct",async(req,res)=>{
    res.send("Borrrar Producto")
})

module.exports = ProductRouter;