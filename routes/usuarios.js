import express from "express";
import { crearUsuario } from "../controller/usuarioController.js";
import { check } from "express-validator";

const router = express.Router();

// Definir las rutas
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'agrega un email valido').isEmail(),
        check('password', 'el password debe ser minimo 6 caracteres').isLength({min:6})
    ],
    crearUsuario);

// Exportar el router
export default router;