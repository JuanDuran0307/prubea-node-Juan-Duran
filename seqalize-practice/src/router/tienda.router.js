// Importar módulos y modelos necesarios
const TiendasRouter = require("express").Router();
const tienda = require("../models/tiendas.model");

// Definir la ruta para obtener todas las tiendas
TiendasRouter.get("/seeStores", async (req, res) => {
    try {
        // Consultar todas las tiendas
        const tiendas = await tienda.findAll();

        // Validar si hay tiendas encontradas
        if (tiendas.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontraron tiendas",
            });
        }

        // Imprimir información de las tiendas en la consola
        console.log(tiendas.every(user => user instanceof tienda)); // true
        console.log("All tiendas:", JSON.stringify(tiendas, null, 2));

        // Enviar la respuesta con la información de las tiendas
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Tiendas obtenidas exitosamente",
            data: tiendas
        });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

TiendasRouter.get("/seeStore/:id", async (req, res) => {
    try {
        // Obtener el ID de la tienda desde los parámetros de la solicitud
        const id = req.params.id;

        // Consultar la tienda por su ID
        const TIenda = await tienda.findOne({ where: { id: id } });

        // Validar si la tienda no fue encontrada
        if (!TIenda) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Tienda no encontrada",
            });
        }

        console.log("TIenda:", TIenda);
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Tienda obtenida exitosamente",
            data: TIenda
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = TiendasRouter;
