import Usuario from "../models/Usuario.js";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.errors });
    }

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crea un nuevo usuario
        usuario = new Usuario(req.body);

        // hashear passwords
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guarda un usuario
        await usuario.save();

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
        res.status(400).send("Hubo un error");
    }
};
