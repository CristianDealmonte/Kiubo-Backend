import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
    emisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    receptor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

export default Mensaje;