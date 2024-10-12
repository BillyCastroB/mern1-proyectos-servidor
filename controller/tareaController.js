import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";
import { validationResult } from "express-validator";

export const crearTarea = async (req, res)=>{
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.errors})
    }

    try {
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({ msj: 'Proyecto no encontrado' })
         }

        //  revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msj: 'No autorizado' });
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })
    }
}


export const obtenerTareas = async (req, res)=>{
    try{
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({ msg: 'Proyecto no autorizado' })
        }

        // 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No Autorizado' })
        }

        // obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json(tareas);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export const actualizarTarea = async (req, res)=>{

    try{
        const { proyecto, nombre, estado } = req.body;
        // tarea existe
        let tarea = Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(400).json({ msg: 'no existe esa tarea'})
        }
        const existeProyecto = await Proyecto.findById(proyecto);
        
        // 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No Autorizado' })
        }
     
        // const nueva Tarea
        const nuevaTarea = {}
        if(nombre){
            nuevaTarea.nombre = nombre
        }
        if(estado){
            nuevaTarea.estado = estado
        }

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true} );
        res.json({tarea})
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export const eliminarTarea = async (req, res)=>{

    try{

        const { proyecto } = req.body;
        // tarea existe
        let tarea = Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(400).json({ msg: 'no existe esa tarea'})
        }
        const existeProyecto = await Proyecto.findById(proyecto);
        
        // 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No Autorizado' })
        }
     
        // eliminar

        await Tarea.findOneAndDelete({_id: req.params.id});
        res.json({msg: 'tarea eliminada'})

    }catch(error){
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })
    }
}