import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";
import { check } from "express-validator";
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas } from "../controller/tareaController.js";


router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    crearTarea
)
router.get('/',
    authMiddleware,
    obtenerTareas
)
router.put('/:id',
    authMiddleware,
    actualizarTarea
)
router.delete('/:id',
    authMiddleware,
    eliminarTarea
)


export default router;