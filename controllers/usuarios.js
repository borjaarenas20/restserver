const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "Sin nombre", apikey, page = 1, limit = 10 } = req.query;

  res.json({
    msg: "get API - usuariosGet",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post API - usuariosPost",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API - usuariosPut",
    id,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
