const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;

    // next(); // pasar al siguiente middleware en la pila del middleware express
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({
  //       ok: false,
  //       errors: errors.mapped(),
  //     });
  //   }

  next();
};

module.exports = { validarJWT };
