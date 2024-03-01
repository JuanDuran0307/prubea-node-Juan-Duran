const CarritoRouter = require("express").Router();
const carritos = require("../models/carritos.model");
const productos = require("../models/product.model");
const promociones = require("../models/promociones.model");
const tiendas_productos = require("../models/tienda.product.model");
const tiendas_promociones = require("../models/tienda.promociones.model")
const tiendas = require("../models/tiendas.model");
const users = require("../models/users.model");


tiendas.belongsToMany(productos, { through: 'tiendas_productos', foreignKey: 'id_tienda' });
productos.belongsToMany(tiendas, { through: 'tiendas_productos', foreignKey: 'id_producto' });
tiendas.belongsToMany(promociones, { through: 'tiendas_promociones', foreignKey: 'id_tienda' });
promociones.belongsToMany(tiendas, { through: 'tiendas_promociones', foreignKey: 'id_promocion' });

productos.hasMany(carritos, { foreignKey: 'id_producto' });
carritos.belongsTo(productos, { foreignKey: 'id_producto' });
users.hasMany(carritos, { foreignKey: 'id_user' });
carritos.belongsTo(users, { foreignKey: 'id_user' });


CarritoRouter.post("/agregarAlcarrito",async(req,res)=>{
    try {
    const defaultUserId = 1;
    const defaultQuantity = 1;
    const { id_producto, id_tienda } = req.body;

    const result = await carritos.create({
      id_producto,
      id_tienda,
      id_user: defaultUserId,
      cantidad: defaultQuantity,
    });

    res.status(201).json({
        result
    });
    } catch (error) {
        console.error("error",error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


CarritoRouter.get('/listartienda_usario/:id_tienda/:id_user', async (req, res) => {
  try {
      const idTienda = req.params.id_tienda;
      const idUser = req.params.id_user;
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
                              }]
                      }
                          ]
              },
              {
                  model: promociones,
                  through: { model: tiendas_promociones }
              }
          ]
      });
      


      const productosInfo = Array.isArray(tienda?.productos)?tienda.productos.map(({ id, nombre, presentacion, barcode, tiendas_productos, Carritos }) => {
          let cantidadCarrito = +1;
          if (Carritos && Carritos.length > 0) {
              cantidadCarrito = Carritos[0].cantidad;
          }

          if (cantidadCarrito != +1) {
              return {
                  id_tienda,
                  id_producto: id,
                  nombre,
                  presentacion,
                  barcode,
                  valor: tiendas_productos.valor,
                  cantidad: cantidadCarrito,
                  valor_total: tiendas_productos.valor * cantidadCarrito,
                  promociones: Array.isArray(tienda?.promociones)?tienda.promociones.map(({ id_promocion, nombre, porcentaje }) => ({
                      id_promocion,
                      nombre,
                      porcentaje,
                      valor_promocion: tiendas_productos.valor * (100 - porcentaje) / 100
                  })):[]
              };
          }
      }):[];

      

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