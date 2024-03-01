const express = require('express');
const PedidosRouter = express.Router();
const pedidos = require("../models/pedidos.model");
const pedidos_productos = require("../models/pedidos.productos");
const pedidos_estados = require("../models/pedidos.estados");
const users_clientes = require("../models/users.clientes.model");
const tiendas_distancias = require("../models/tienda.distancia.model");
const productos = require('../models/product.model');
const promociones = require("../models/promociones.model");

PedidosRouter.post('/crearPedido/:id_tienda/:id_user', async (req, res) => {
    try {
        const { id_tienda, id_user } = req.params;
        const data = req.body;

        // Validar que exista al menos un producto en la consulta
        if (!Array.isArray(consult_data) || consult_data.length === 0) {
            return res.status(400).json({
                message: 'La consulta de productos está vacía o no es un array.'
            });
        }

        const consulta = await fetch(`http://localhost:3001/market/listartienda_usario/${id_tienda}/${id_user}`);
        let consult_data = [];
        let suma_valores = 0;
        let suma_valores_descuento = 0;

        if (consulta.ok) {
            let consult_Json;
            consult_Json = await consulta.json();
            consult_data = consult_Json.data;

            // Validar que exista al menos un producto en la consulta después de obtenerla
            if (!Array.isArray(consult_data) || consult_data.length === 0) {
                return res.status(400).json({
                    message: 'La consulta de productos está vacía o no es un array después de obtenerla.'
                });
            }

            // Calcular la suma de valores
            suma_valores = consult_data.reduce((acumulador, producto) => acumulador + producto.valor_total, 0);
        }

        // Validar que la suma de valores sea mayor a 0
        if (suma_valores <= 0) {
            return res.status(400).json({
                message: 'La suma de valores de los productos es menor o igual a 0.'
            });
        }

        consult_data.forEach(producto => {
            let valorTotalProducto = producto.valor_total;

            if (producto.promociones && producto.promociones.length > 0) {
                const promocion = producto.promociones[0];
                const descuento = (promocion.porcentaje / 100) * valorTotalProducto;
                valorTotalProducto -= descuento;
            }
            suma_valores_descuento += valorTotalProducto;
        });

        // Crear el pedido
        const createPedido = await pedidos.create({
            instrucciones: data.instrucciones,
            entrega_fecha: data.entrega_fecha,
            valor_productos: suma_valores,
            valor_descuento: suma_valores - suma_valores_descuento,
            id_tienda: id_tienda,
            id_user: id_user
        });

        // Crear el estado del pedido
        const createPedidoEstado = await pedidos_estados.create({
            estado: 1,
            id_pedido: createPedido.id
        });

        // Crear los productos del pedido
        for (const producto of consult_data) {
            await pedidos_productos.create({
                cantidad: producto.cantidad,
                valor_unitario: producto.valor,
                id_producto: producto.id_producto,
                id_pedido: createPedido.id
            });
        }

        res.status(201).json({
            message: "Pedido, pedido estado y pedido producto creados"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el pedido'
        });
    }
});

module.exports = PedidosRouter;
