import Proyecto from "../models/Proyecto.js"
import { validationResult } from "express-validator";

export const crearProyecto = async (req, res)=>{
    // Revizar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.errors })
    }

    try {
        // crear nuevo proyecto
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        await proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }

}
export const obtenerProyectos = async (req, res)=>{
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

export const actualizarProyecto = async (req, res) =>{

    // Revizar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.errors })
    }
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre
    }

    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        // revisar si el proyecto existe
        if(!proyecto){
            res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No autorizado' })
        }
        // actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: nuevoProyecto },
            { new: true }
        );

        res.json({proyecto})

    } catch (error) {
        console.log(error)
        res.status(500).send('error en el servidor');
    }
}

export const eliminarProyecto = async (req, res)=>{
    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        // revisar si el proyecto existe
        if(!proyecto){
            res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No autorizado' })
        }
        // eliminar el proyecto
        await Proyecto.findByIdAndDelete(req.params.id);
        return res.json({ msg: 'proyecto eliminado' })

    } catch (error) {
        console.log(error);
        res.status(500).send('error en el servidor');
    }
}