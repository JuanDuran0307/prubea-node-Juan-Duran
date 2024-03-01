const ProductRouter = require("express").Router();
const productos = require("../models/product.model");
const tiendas_productos = require("../models/tienda.product.model");
const promociones = require("../models/promociones.model");
const tiendas_promociones = require("../models/tienda.promociones.model");
const tiendas = require("../models/tiendas.model");

// Endpoint para obtener todos los productos
ProductRouter.get("/productos", async (req, res) => {
    try {
        await productos.sync();
        res.send("product route");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para obtener un producto específico
ProductRouter.get("/OneProduct", async (req, res) => {
    res.send("productOne route");
});

// Endpoint para crear un nuevo producto
ProductRouter.post("/CreateProduct", async (req, res) => {
    try {
        await productos.sync();
        const { estado, kit, barcode, nombre, presentacion, descripcion, foto, peso } = req.body;
        const createProduct = await productos.create({
            estado, kit, barcode, nombre, presentacion, descripcion, foto, peso
        });

        console.log(req.body);
        res.status(201).json({
            ok: true,
            status: 201,
            message: "PRODUCT CREATED",
            data: createProduct
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para asociar un producto a una tienda
ProductRouter.post("/asociarProducto", async (req, res) => {
    try {
        const { id_tienda, id_producto } = req.body;

        // Validar si ya existe una relación con esos valores en la tienda
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
            tienda_nombre: tienda.nombre, // Se agrega el nombre de la tienda
            data: asociateProduct
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para actualizar un producto (PUT)
ProductRouter.put("/PutProduct/:id_producto", async (req, res) => {
    try {
        const id_producto = req.params.id_producto;
        const data = req.body;

        // Validar que el producto exista
        const productoExistente = await productos.findByPk(id_producto);
        if (!productoExistente) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }


        res.status(200).json({
            ok: true,
            status: 200,
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para eliminar un producto (DELETE)
ProductRouter.delete("/DelProduct/:id_producto", async (req, res) => {
    try {
        const id_producto = req.params.id_producto;

        // Validar que el producto exista
        const productoExistente = await productos.findByPk(id_producto);
        if (!productoExistente) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = ProductRouter;
