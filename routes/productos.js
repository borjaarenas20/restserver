const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {
  existeProductoId,
  existeCategoriaId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", [obtenerProductos]);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria").custom(existeCategoriaId),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProductoId), validarCampos],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
