import express from "express"
const router = express.Router();
import { actualizarProyecto, crearProyecto, eliminarProyecto, obtenerProyectos } from '../controller/proyectoController.js';
import authMiddleware from "../middleware/auth.js";
import { check } from "express-validator";

router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    crearProyecto
)
router.get('/', 
    authMiddleware,
    obtenerProyectos
)
router.put('/:id', 
    authMiddleware,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    actualizarProyecto
)

router.delete('/:id', 
    authMiddleware,
    eliminarProyecto
)

export default router;