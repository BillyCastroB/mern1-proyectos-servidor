import express from "express";
import { check } from "express-validator";
import { autentificarUsuario, usuarioAutenticado } from "../controller/authController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

// Definir las rutas
// iniciar sesion
router.post('/',
    autentificarUsuario
);

router.get('/',
    authMiddleware,
    usuarioAutenticado
);

// Exportar el router
export default router;