const express = require("express");
const router = express.Router();
const { crearMesero, obtenerMeseros, actualizarMesero, eliminarMesero } = require("../controllers/meseroController");
router.post("/crear_mesero", crearMesero);
router.get("/obtener_meseros", obtenerMeseros);
router.put("/actualizar_mesero", actualizarMesero);
router.delete("/eliminar_mesero/:id", eliminarMesero);


module.exports = router;
