const CarritoRouter = require("express").Router();
const carritos = require("../models/carritos.model");
const productos = require("../models/product.model");
const promociones = require("../models/promociones.model");
const tiendas_productos = require("../models/tienda.product.model");
const tiendas_promociones = require("../models/tienda.promociones.model")
const tiendas = require("../models/tiendas.model");
const users = require("../models/users.model");

// Definición de relaciones
tiendas.belongsToMany(productos, { through: 'tiendas_productos', foreignKey: 'id_tienda' });
productos.belongsToMany(tiendas, { through: 'tiendas_productos', foreignKey: 'id_producto' });
tiendas.belongsToMany(promociones, { through: 'tiendas_promociones', foreignKey: 'id_tienda' });
promociones.belongsToMany(tiendas, { through: 'tiendas_promociones', foreignKey: 'id_promocion' });
productos.hasMany(carritos, { foreignKey: 'id_producto' });
carritos.belongsTo(productos, { foreignKey: 'id_producto' });
users.hasMany(carritos, { foreignKey: 'id_user' });
carritos.belongsTo(users, { foreignKey: 'id_user' });

// Endpoint para agregar al carrito
CarritoRouter.post("/agregarAlcarrito", async (req, res) => {
    try {
        // Validar la existencia de id_producto e id_tienda
        const { id_producto, id_tienda } = req.body;
        if (!id_producto || !id_tienda) {
            return res.status(400).json({ error: 'Los campos id_producto e id_tienda son requeridos' });
        }

        // Crear un nuevo registro en la tabla carritos
        const defaultUserId = 1;
        const defaultQuantity = 1;
        const result = await carritos.create({
            id_producto,
            id_tienda,
            id_user: defaultUserId,
            cantidad: defaultQuantity,
        });

        res.status(201).json({
            message:"Agregado Al Carrito",
            result
        });
    } catch (error) {
        console.error("error", error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Endpoint para listar los productos en el carrito de un usuario en una tienda específica
CarritoRouter.get('/listartienda_usario/:id_tienda/:id_user', async (req, res) => {
    try {
        const idTienda = req.params.id_tienda;
        const idUser = req.params.id_user;

        // Validar si idTienda e idUser son números enteros
        if (isNaN(idTienda) || isNaN(idUser)) {
            return res.status(400).json({ error: 'Los parámetros id_tienda e id_user deben ser números enteros' });
        }

        const tienda = await tiendas.findByPk(idTienda, {
            include: [
                {
                    model: productos,
                    through: { model: tiendas_productos },
                    include: [
                        {
                            model: carritos,
                            include: [
                                {
                                    model: users,
                                    where: { id: idUser }
                                }
                                    ]
                        }
                    ]
                },
                {
                    model: promociones,
                    through: { model: tiendas_promociones }
                }
            ]
        });

        // Check if tienda and tienda.productos estan definidos
        if (!tienda || !tienda.productos) {
            return res.status(404).json({ message: 'No se encontró la tienda o no hay productos disponibles' });
        }

        const productosInfo = Array.isArray(tienda?.productos) ? tienda.productos.map(({ id, nombre, presentacion, barcode, tiendas_productos, Carritos }) => {
            let cantidadCarrito = null;
            if (Carritos && Carritos.length > 0) {
                cantidadCarrito = Carritos[0].cantidad;
            }

            if (cantidadCarrito != null) {
                return {
                    idTienda,
                    id_producto: id,
                    nombre,
                    presentacion,
                    barcode,
                    valor: tiendas_productos.valor,
                    cantidad: cantidadCarrito,
                    valor_total: tiendas_productos.valor * cantidadCarrito,
                    promociones: Array.isArray(tienda?.promociones) ? tienda.promociones.map(({ id_promocion, nombre, porcentaje }) => ({
                        id_promocion,
                        nombre,
                        porcentaje,
                        valor_promocion: tiendas_productos.valor * (100 - porcentaje) / 100
                    })) : []
                };
            }
        }) : [];

        res.status(200).json({
            "message": "Consultado correctamente",
            "data": productosInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al mostrar los datos de la tienda'
        });
    }
});

module.exports = CarritoRouter;
