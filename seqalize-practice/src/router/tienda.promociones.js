const promociones = require("../models/promociones.model");
const tiendas_promociones = require("../models/tienda.promociones.model");

const createTiendaPromoRouter = () => {
    const TiendaPromoRouter = require("express").Router();
    const productos = require("../models/product.model");
    const promociones = require("../models/promociones.model");
    const tiendas_productos = require("../models/tienda.product.model");
    const tiendas = require("../models/tiendas.model");

    tiendas.belongsToMany(productos, { through: 'tiendas_productos', foreignKey: 'id_tienda' });
    productos.belongsToMany(tiendas, { through: 'tiendas_productos', foreignKey: 'id_producto' });
    tiendas.belongsToMany(promociones, { through: 'tiendas_promociones', foreignKey: 'id_tienda' });
    promociones.belongsToMany(tiendas, { through: 'tiendas_promociones', foreignKey: 'id_promocion' });

    TiendaPromoRouter.get("/seeProductPromotions/:id", async (req, res) => {
        try {
            const idTienda = req.params.id;
            const tienda = await tiendas.findByPk(idTienda, {
                include: [
                    {
                        model: productos,
                        through: { model: tiendas_productos } 
                    },
                    {
                        model: promociones,
                        through: { model: tiendas_productos } 
                    }
                ]
            });

            if (!tienda) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "Tienda no encontrada",
                });
            }

            const productosInfo = Array.isArray(tienda?.productos) ? tienda.productos.map(({ id, nombre, descripcion, barcode, tiendas_productos }) => ({
                idTienda,
                id_producto: id,
                nombre,
                descripcion,
                barcode,
                valor: tiendas_productos.valor,
                promotions: Array.isArray(tienda?.promociones)? tienda.promociones.map(({ id, nombre, porcentaje, tiendas_promociones }) => ({
                    id_promocion: id,
                    nombre,
                    porcentaje,
                    estado: tiendas_promociones.estado,
                    inicio: new Date(tiendas_promociones.inicio),
                    fin: new Date(tiendas_promociones.fin)
                })) : []
            
            })) : [];


            res.status(201).json({
                ok: true,
                status: 201,
                message: "Promociones de la tienda obtenidas exitosamente",
                data: productosInfo
            });
        } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return TiendaPromoRouter;
};

module.exports = createTiendaPromoRouter;
