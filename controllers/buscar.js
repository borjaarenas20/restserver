const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");
const producto = require("../models/producto");
const { usuariosPut } = require("./usuarios");

const colecionesPermitidas = ["categorias", "usuarios", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!colecionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `La coleccion ${coleccion}, no es una coleccion permitida`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "esta busqueda no existe",
      });
  }
};

module.exports = {
  buscar,
};
