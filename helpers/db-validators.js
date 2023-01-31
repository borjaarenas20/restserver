const { Categoria, Role, Usuario, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo '${correo}' ya esta registrado`);
  }
};

const existeUsuarioId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id '${id}' no existe`);
  }
};

const existeCategoriaId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id '${id}' no existe`);
  }
};

const existeProductoId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id '${id}' no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
  existeCategoriaId,
  existeProductoId,
};
