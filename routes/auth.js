const express = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require("../controllers/auth");
const router = express.Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El Password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  crearUsuario
);
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El Password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUsuario
);
router.get("/renew", revalidarToken);

module.exports = router;
