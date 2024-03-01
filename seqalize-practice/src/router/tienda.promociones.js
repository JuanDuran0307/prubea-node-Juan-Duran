
const createTiendaPromoRouter = () => {
    // Crear el router de express para las rutas de la tienda y promociones
    const TiendaPromoRouter = require("express").Router();
    const productos = require("../models/product.model");
    const promociones = require("../models/promociones.model");
    const tiendas_productos = require("../models/tienda.product.model");
    const tiendas = require("../models/tiendas.model");

    // Definir las asociaciones entre modelos
    tiendas.belongsToMany(productos, { through: 'tiendas_productos', foreignKey: 'id_tienda' });
    productos.belongsToMany(tiendas, { through: 'tiendas_productos', foreignKey: 'id_producto' });
    tiendas.belongsToMany(promociones, { through: 'tiendas_promociones', foreignKey: 'id_tienda' });
    promociones.belongsToMany(tiendas, { through: 'tiendas_promociones', foreignKey: 'id_promocion' });

    // Definir la ruta para obtener las promociones de los productos de una tienda
    TiendaPromoRouter.get("/seeProductPromotions/:id", async (req, res) => {
        try {
            // Obtener el ID de la tienda desde los parámetros de la solicitud
            const idTienda = req.params.id;

            // Validar si la tienda existe
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

            // Manejar el caso en que la tienda no existe
            if (!tienda) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "Tienda no encontrada",
                });
            }

            // Mapear la información de los productos y promociones de la tienda
            const productosInfo = Array.isArray(tienda?.productos) ? tienda.productos.map(({ id, nombre, descripcion, barcode, tiendas_productos }) => ({
                idTienda,
                id_producto: id,
                nombre,
                descripcion,
                barcode,
                valor: tiendas_productos.valor,
                promotions: Array.isArray(tienda?.promociones) ? tienda.promociones.map(({ id, nombre, porcentaje, tiendas_promociones }) => ({
                    id_promocion: id,
                    nombre,
                    porcentaje,
                    estado: tiendas_promociones?.estado,
                    inicio: tiendas_promociones?.inicio ? new Date(tiendas_promociones?.inicio) : null,
                    fin: tiendas_promociones?.fin ? new Date(tiendas_promociones?.fin) : null
                })) : []
            })) : [];

           
            res.status(200).json({
                ok: true,
                status: 200,
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
