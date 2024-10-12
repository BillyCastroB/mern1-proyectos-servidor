import Usuario from "../models/Usuario.js";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const autentificarUsuario = async (req, res)=>{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.errors });
    }

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // si ek usuario si existe => revisamos el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg: 'Password incorrecto' })
        }
        // si pasa todo
        // json-web-token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 18000
        }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
        
    } catch (error) {
        console.log(error);
    }
  
}

export const usuarioAutenticado = async (req, res)=>{

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error'});
    }

}