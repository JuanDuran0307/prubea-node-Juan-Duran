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

    
        const consulta = await fetch(`http://localhost:3001/market/listartienda_usario/${id_tienda}/${id_user}`);
        let consult_data = [];
        let suma_valores = 0;
        let suma_valores_descuento = 0;

        if (consulta.ok) {
            let consultaJson;
            consultaJson = await consulta.json();
            consult_data = consultaJson.data;
            suma_valores = consult_data.reduce((acumulador, producto) => acumulador + producto.valor_total, 0);
        }
        consult_data.forEach(productos => {
            let valorTotalProducto = productos.valor_total;

            if (productos.promociones && productos.promociones.length > 0) {

                const promocion = productos.promociones[0];
                const descuento = (promocion.porcentaje / 100) * valorTotalProducto;
                valorTotalProducto -= descuento;
            }
            suma_valores_descuento += valorTotalProducto;
        });

      
        const createPedido = await pedidos.create({
       
            instrucciones: data.instrucciones,
            entrega_fecha: data.entrega_fecha,
            valor_productos: suma_valores,
            valor_descuento: suma_valores - suma_valores_descuento,
       
            id_tienda: id_tienda,
            id_user: id_user
        });


        const createPedidoEstado = await pedidos_estados.create({
            estado: 1, 
            id_pedido: createPedido.id
        });


        for (const producto of consultaData) {
          
            await pedidos_productos.create({
                cantidad: producto.cantidad,
                valor_unitario: producto.valor,
                // Add more fields as needed
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




