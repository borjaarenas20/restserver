const { response } = require("express");
const { body } = require("express-validator");
// const { Producto, Categoria } = require("../models");
const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
  const { limite = 10, desde = 0 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(desde)
      .limit(limite),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    producto,
  });
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const nombre = body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }

  const data = {
    ...body,
    nombre,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(producto);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
