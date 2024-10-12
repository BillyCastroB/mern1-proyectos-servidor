import mongoose from 'mongoose';
import Usuario from './Usuario.js';

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        href: Usuario
    },
    creado:{
        type: Date,
        default: Date.now()
    }
    
})

export default mongoose.model('Proyecto', ProyectoSchema);