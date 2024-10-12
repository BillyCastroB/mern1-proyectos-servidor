import mongoose, { model } from "mongoose";

const usuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Usuario', usuariosSchema);