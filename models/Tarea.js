import mongoose from "mongoose";
const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
})

export default mongoose.model('Tarea' ,TareaSchema);