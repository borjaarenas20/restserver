const { Response, response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msn: "No se ha verificado el jwt",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no tiene permisos para realizar esta accion`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msn: "No se ha verificado el jwt",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Para realizar esta accion necesita alguno de estos permisos: ${roles} `,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
